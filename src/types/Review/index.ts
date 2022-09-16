import { UserInfo } from "../UserInfo";

export type ReviewType = {
  userInfo: UserInfo;
  score: number;
  title: string;
  content: string;
  date: Date;
  images: string[];
};
