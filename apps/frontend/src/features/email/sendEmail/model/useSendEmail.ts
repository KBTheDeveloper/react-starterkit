import { useState } from "react";

import { message } from "antd";

import api from "@shared/api/client";

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    to: string;
    subject: string;
    message: string;
  }) => {
    setLoading(true);
    try {
      await api.post("/email/send", values);
      message.success("Email sent");
    } catch {
      message.error("Failed to send");
    } finally {
      setLoading(false);
    }
  };
  return { loading, onFinish };
};

export default useSendEmail;
