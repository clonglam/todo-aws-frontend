import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as actions from "../../features/todo/todosAPI";

const api =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type !== actions.apiCallBegan) return next(action);

    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "https://jsonplaceholder.typicode.com",
        url,
        method,
        data,
      });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };
export default api;
