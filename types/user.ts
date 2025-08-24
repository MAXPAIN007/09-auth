import { AxiosError } from "axios";

export type UserRequest = {
  email: string;
  password: string;
};

export interface UserMe {
  username: string;
  email: string;
  avatar: string;
}

export type CheckSession = {
  success: boolean;
};

export type ApiError = AxiosError<{ error: string }>