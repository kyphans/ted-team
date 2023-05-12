interface OriginalData {
  firstName: string;
  lastName: string;
  mssv: string;
  phone: string;
  email: string;
  generation: number;
  joinedDate: string;
  leaveDate: string;
  isActive: boolean;
  isDelete: boolean;
  description: string;
}

interface ConvertedData {
  key: number;
  fullName: string;
  mssv: string;
  phone: string;
  email: string;
  generation: number;
  joinedDate: Date;
  leaveDate: Date;
  isActive: boolean;
  isDelete: boolean;
  description: string;
}

export default function convertData(originalData: OriginalData[]): ConvertedData[] {
  return originalData.map((data, index) => {
    const { firstName, lastName, joinedDate, leaveDate, ...rest } = data;
    const fullName = `${firstName} ${lastName}`;
    const convertedJoinedDate = new Date(joinedDate);
    const convertedLeaveDate = new Date(leaveDate);

    return {
      key: index,
      fullName,
      joinedDate: convertedJoinedDate,
      leaveDate: convertedLeaveDate,
      ...rest,
    };
  });
}
