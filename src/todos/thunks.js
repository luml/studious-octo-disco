// a thunk is a function returns another function
import { loadTodosInProgress, loadTodosSuccess, loadTodoFailure } from "./actions"

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress)
        const response = await fetch('http://localhost:8080/todos-delay')
        const todos = await response.json()

        dispatch(loadTodosSuccess(todos))

    } catch (e) {
        dispatch(loadTodoFailure())
        dispatch(displayAlert(e))
    }


}

export const displayAlert = (text) => {
    alert(`You have an error: ` + text)
}