import data from '../../common/fakeData/orgChart.json';

interface Member {
  firstName: string;
  lastName: string;
  mssv: string;
  email?: string;
  department: string;
  role: string;
  generation: number;
}

export function getDepartmentMembers(data: Member[], department: string | null): Member[] {
  const departmentMembers = [];
  for (const member of data) {
    if (member.department === department && member.role !== 'Lead') {
      departmentMembers.push(member);
    } else if (member.department === null) {
      departmentMembers.push(member);
    }
  }
  return departmentMembers;
}

export function getDepartmentLead(data: Member[], department: string | null): Member[] {
  const departmentLead = [];
  for (const member of data) {
    if (member.department === department && member.role === 'Lead') {
        departmentLead.push(member);
    }
  }
  return departmentLead;
}