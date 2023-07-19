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
  info: InfoUser[] | [];
}

export type UserLocalStorageDataType = {
  token?: string;
  info: UserData;
};

interface InfoUser {
  departmentName: string;
  departmentDisplayName: string;
  roleTitle: string;
  rolePriority: number;
}
