import { createCustomAction } from 'typesafe-actions';

const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const UPDATE_DATE = "UPDATE_DATE";

export const incrementCounter = createCustomAction(
  typeof INCREMENT_COUNTER,
  (inc: number) => ({ inc })
);

export const updateDate = createCustomAction(
  typeof UPDATE_DATE,
  (date: Date) => ({ date })
);
