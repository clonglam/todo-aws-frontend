import { PayloadAction } from "@reduxjs/toolkit";

const logger = (store: any) => (next: any) => (action: PayloadAction) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
export default logger;
