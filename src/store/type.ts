import { DepartmentType } from '../types/department.types';

export type DepartmentStateProps = {
  departments: DepartmentType[];
  setDepartments(departments: DepartmentType[]): void;
};
