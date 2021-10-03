import { createSelector } from "reselect"

export const getTodos = state => state.todos.data
export const getTodosLoading = state => state.todos.isLoading

// a selector
export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted)
)

// another selector
export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted)
)