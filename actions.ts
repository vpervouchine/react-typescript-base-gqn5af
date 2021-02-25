import { createCustomAction } from 'typesafe-actions';

const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const UPDATE_DATE = "UPDATE_DATE";

export const incrementCounter = createCustomAction(
  INCREMENT_COUNTER,
  (inc: number) => ({ inc })
);

export const updateDate = createCustomAction(
  UPDATE_DATE,
  (date: Date) => ({ date })
);
