export interface StoreState {
  date: Date;
  count: number;
}

export const initialStoreState: StoreState = {
  date: new Date(),
  count: 0
};