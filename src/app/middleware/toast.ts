import { PayloadAction } from "@reduxjs/toolkit";
const toast = (store: any) => (next: any) => (action: PayloadAction) => {
  if (action.type === "error") console.log("Toastify", action.payload);
  else next(action);
};

export default toast;
