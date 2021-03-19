export interface Task {
  name: string;
  desc?: string;
}

export interface StoreState {
  date: Date;
  count: number;
  taskList: Array<Task>;
}

export const initialStoreState: StoreState = {
  date: new Date(),
  count: 0,
  taskList: [
    {
      name: 'Typescript',
      desc: 'Learn typescript'
    }
  ]
};