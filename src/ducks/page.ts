import { State } from "types.d/State";
import { Page } from "types.d/Page";

export type Actions = SetPageAction;

const SET_PAGE = "page/SET";

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage: action.payload.page };

    default:
      return state;
  }
}

interface SetPageAction {
  type: typeof SET_PAGE;
  payload: {
    page: Page;
  };
}

export const setPage = (page: Page): SetPageAction => ({
  type: SET_PAGE,
  payload: { page },
});
