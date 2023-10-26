import User from "./User";

export default interface MemberType {
  _id: string;
  user: User;
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  dateLastVisited: Date;
}
