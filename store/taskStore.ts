import { create } from "zustand";
import { task } from "../interfaces/task";

interface TaskState {
  tasks: task[];
  addTask: (task: task) => void;
  deleteTask: (index: number) => void;
  editTask: (index: number, key: string, value: string) => void;
}
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  deleteTask: (index) => {
    set((state) => {
      state.tasks.splice(index, 1);
      return { tasks: state.tasks };
    });
  },
  editTask: (index, key, value) => {
    set((state) => {
      const _tasks = [...state.tasks];
      _tasks[index][key] = value;
      return { tasks: _tasks };
    });
  },
}));
