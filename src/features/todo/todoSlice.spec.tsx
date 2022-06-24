import reducer, {
  todoAdded,
  TodosState,
  todoCompleted,
  todoDeleted,
} from "./todosSlice";

test("should handle a todo being added to an existing list", () => {
  const previousState: TodosState = {
    list: [
      {
        text: "Run the tests",
        completed: true,
        id: "0",
      },
    ],
    lastFetch: null,
    status: "idle",
  };
  expect(reducer(previousState, todoAdded("Use Redux"))).toEqual({
    list: [
      {
        text: "Run the tests",
        completed: true,
        id: 0,
      },
      { text: "Use Redux", completed: false, id: 1 },
    ],
    lastFetch: null,
    status: "idle",
  });
});

test("should change the completed state to true", () => {
  const previousState: TodosState = {
    list: [
      {
        text: "Run the tests",
        completed: false,
        id: "0",
      },
    ],
    lastFetch: null,
    status: "idle",
  };
  expect(reducer(previousState, todoCompleted("0"))).toEqual({
    list: [
      {
        text: "Run the tests",
        completed: true,
        id: "0",
      },
    ],
    lastFetch: null,
    status: "idle",
  });
});

test("should delete the selected todo Items", () => {
  const previousState: TodosState = {
    list: [
      {
        text: "Run the tests",
        completed: false,
        id: "0",
      },
    ],
    lastFetch: null,
    status: "idle",
  };
  expect(reducer(previousState, todoDeleted("0"))).toEqual({
    list: [],
    lastFetch: null,
    status: "idle",
  });
});
