import { create } from 'zustand';
import { DepartmentStateProps } from './type';

const useDepartmentStore = create<DepartmentStateProps>((set) => ({
  departments: [],
  setDepartments: (departments: DepartmentStateProps['departments']) => set({ departments }),
}));

export default useDepartmentStore;
