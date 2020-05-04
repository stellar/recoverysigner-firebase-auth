import { Status } from "types.d/Status";
import { State } from "types.d/State";

type Actions = SetStatusAction;

const SET_STATUS = "status/SET";

export function reducer(state: State, action: Actions): State {
  const { payload } = action;

  switch (action.type) {
    case SET_STATUS: {
      const { statuses } = state;
      const { actionType, status } = payload;

      return { ...state, statuses: { ...statuses, [actionType]: status } };
    }

    default: {
      return state;
    }
  }
}

interface SetStatusAction {
  type: typeof SET_STATUS;
  payload: SetStatusPayload;
}

interface SetStatusPayload {
  actionType: string;
  status: Status;
}

export function setStatus(payload: SetStatusPayload): SetStatusAction {
  return { type: SET_STATUS, payload };
}
