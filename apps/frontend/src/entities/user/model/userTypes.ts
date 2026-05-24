// entities/user/model/userTypes.ts

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NewUser = Omit<User, "id">;

// For forms and validation
export interface UserFormValues {
  name: string;
  email: string;
  password?: string; // optional – only for registration
}
