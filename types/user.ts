export enum UserAuthType {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

export type TUser = {
  name: string;
  email: string;
  authType: UserAuthType;
  createdAt: Date;
  updatedAt: Date;
};
