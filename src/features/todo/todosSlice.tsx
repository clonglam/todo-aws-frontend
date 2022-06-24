import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  nanoid,
} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export type TodosType = {
  id: string;
  text: string;
  completed: boolean;
};
export interface TodosState {
  list: TodosType[];
  status: "idle" | "pending" | "fulfilled" | "rejected"; //checkfor serverStatus
  lastFetch: Date | null;
}

export const checkServerStatus = createAsyncThunk(
  "todos/serverStatus",
  async () => {
    const response = await fetch(`http://localhost:8080/api/todos/health`);
    return response;
  }
);

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosStatus",
  async () => {
    const response = await fetch(`http://localhost:8080/api/todos/all`);
    return await response.json();
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodoStatus",
  async (title: string) => {
    const response = await fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(title),
    });
    return response.json();
  }
);

// Define the initial state using that type
const initialState: TodosState = {
  list: [
    {
      text: "Use Redux",
      completed: true,
      id: "0",
    },
    {
      text: "Use Redux22",
      completed: false,
      id: "1",
    },
    {
      text: "Use Redux333",
      completed: false,
      id: "2",
    },
  ],
  status: "idle",
  lastFetch: null,
};

export const todosSlice = createSlice({
  name: "todos",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    todosReiceved(state: TodosState, action: PayloadAction<TodosType[]>) {
      state.list = action.payload;
    },
    fetchTodoList(state: TodosState, action: PayloadAction<TodosType[]>) {},

    todoAdded(state: TodosState, action: PayloadAction<string>) {
      state.list.unshift({
        id: nanoid(),
        completed: false,
        text: action.payload,
      });
    },

    todoUpdated(state: TodosState, action: PayloadAction<TodosType>) {
      const idx = state.list.findIndex((todo) => todo.id === action.payload.id);
      state.list[idx] = action.payload;
    },
    todoCompleted(state: TodosState, action: PayloadAction<string>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload);
      state.list[index].completed = !state.list[index].completed;
    },

    todoDeleted(state: TodosState, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state, { payload }) => {})
      .addCase(getTodosAsync.rejected, (state, { payload }) => {
        state.status = "rejected"; // server offline
      })
      .addCase(getTodosAsync.fulfilled, (state, { payload }) => {
        console.log(payload);
        const newTodoList = payload.todos.map((item: any) => {
          let newItem: TodosType = {
            id: item.todoId,
            text: item.title,
            completed: item.resolved,
          };
          return newItem;
        });
        state.list = newTodoList;
      })
      .addCase(checkServerStatus.pending, (state, { payload }) => {
        state.status = "pending";
      })
      .addCase(checkServerStatus.fulfilled, (state, { payload }) => {
        state.status = "fulfilled"; // server online
      })
      .addCase(checkServerStatus.rejected, (state, { payload }) => {
        state.status = "rejected"; // server offline
      });
  },
});

export const { todoAdded, todoCompleted, todoDeleted, todoUpdated } =
  todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const todosList = (state: RootState) => state.todos;
export const todoStatus = (state: RootState) => state.todos.status;
// export const todosLoading = (state: RootState) => state.todos.loading;

export default todosSlice.reducer;
