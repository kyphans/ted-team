export interface UserData {
  id: number;
  fullName: string;
  mssv: string;
  phone: string;
  email: string;
  generation: number;
  dayOfBirth: string | null;
  joinedDate: string;
  leaveDate: string;
  isActive: boolean;
  isDelete: boolean;
  description: string;
  gender: string;
  avatar: string;
  info: any[];
}

export type UserLocalStorageDataType = {
  token?: string;
  info: UserData;
}