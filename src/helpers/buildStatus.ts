import { Dispatch } from "redux";

import { StatusType } from "types.d/Status";
import { setStatus } from "ducks/status";

export function buildStatus(actionType: string, dispatch: Dispatch) {
  return (statusType: StatusType, error?: Error) => {
    let status;

    if (statusType === StatusType.loading) {
      status = {
        isLoading: true,
        hasLoaded: false,
        isSuccess: false,
      };
    } else {
      status = {
        isLoading: false,
        hasLoaded: true,
        isSuccess: !error,
        error,
      };
    }

    dispatch(setStatus({ actionType, status }));
  };
}
