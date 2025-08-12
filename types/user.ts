export enum UserAuthType {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  authType: UserAuthType;
  createdAt: Date;
  updatedAt: Date;
};
