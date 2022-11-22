export interface IUser {
  _id?: string;
  email: string;
  name?: string;
  pronouns?: string;
  address?: string;
  birthday?: string;
  userName?: string;
  giftPref?: string;
  wantList?: string;
  avoidList?: string;
  charityList?: string;
  registryList?: string;
  friendList?: string;
}

export interface IList {
  _id?: string;
  createdBy: string;
  title?: string;
  recipient?: string;
  text?: string;
  items?: Array<string>;
}

export interface IUserContext {
  userInfo: IUser | null;
  updateUserInfo: (updatedUser: IUser) => Promise<void>;
}
