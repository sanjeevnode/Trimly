import { UserAuthType } from "./user";

export type RegisterUserData = {
  name: string;
  email: string;
  password: string;
  authType: UserAuthType;
};
