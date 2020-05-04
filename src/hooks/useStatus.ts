import { useSelector } from "react-redux";

import { Status } from "types.d/Status";
import { State } from "types.d/State";

const defaultStatus = {
  hasLoaded: false,
  isLoading: false,
  isSuccess: false,
};

export function useStatus(actionType: string): Status {
  const statuses = useSelector((state: State) => state.statuses);

  return statuses[actionType] || defaultStatus;
}
