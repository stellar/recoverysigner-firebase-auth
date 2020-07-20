import reduceReducers from "reduce-reducers";
import { createStore, Reducer, Action } from "redux";

import { Page } from "types.d/Page";
import { State } from "types.d/State";
import { reducer as appReducer } from "./app";
import { reducer as firebaseReducer } from "./firebase";
import { reducer as pageReducer } from "./page";
import { reducer as statusReducer } from "./status";

const initialState: State = {
  appDidLoad: false,
  phoneNumber: "",
  currentPage: Page.sendVerificationCode,
  locale: "en",
  statuses: {},
} as State;

const rootReducer = reduceReducers(
  initialState,
  appReducer as Reducer<State>,
  firebaseReducer as Reducer<State>,
  pageReducer as Reducer<State>,
  statusReducer as Reducer<State>,
);

export const store = createStore(rootReducer as Reducer<State, Action>);
