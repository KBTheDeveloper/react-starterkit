import { createStore, createEvent, createEffect, sample } from "effector";

import { $user } from "@shared/lib/effector/auth";
import { connectSocket, disconnectSocket, getSocket } from "@shared/lib/socket";

export const newMessageReceived = createEvent<{ from: string; text: string }>();
export const $notifications = createStore<
  Array<{ from: string; text: string }>
>([]).on(newMessageReceived, (state, msg) => [...state, msg]);

// Effects for socket lifecycle
const connectSocketFx = createEffect(() => {
  const socket = connectSocket();
  // Attach listener once
  if (!socket.hasListeners("message")) {
    socket.on("message", (data) => {
      newMessageReceived(data);
    });
  }
});

const disconnectSocketFx = createEffect(() => {
  disconnectSocket();
});

// React to user changes
sample({
  clock: $user,
  filter: (user) => !!user,
  target: connectSocketFx,
});

sample({
  clock: $user,
  filter: (user) => !user,
  target: disconnectSocketFx,
});
export const sendTestMessage = () => {
  const socket = getSocket();
  if (socket?.connected) {
    socket.emit("message", { text: "Hello from client!" });
  } else {
    // eslint-disable-next-line no-console
    console.warn("Socket not connected");
  }
};
