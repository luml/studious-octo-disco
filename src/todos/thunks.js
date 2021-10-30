// a thunk is a function returns another function
import {
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodoFailure,
    createTodo,
    completeTodo,
    removeTodo
} from "./actions"

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

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text })
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        })

        const todo = await response.json()
        dispatch(createTodo(todo))
    } catch (e) {
        dispatch(displayAlert(e))
    }
}

export const removeTodoRequest = id => async dispatch => {
    try {
        // TODO CORS request did not succeed Reason
        // As of Firefox 68, https pages are not permitted to access http://localhost
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        })
        const removedTodo = await response.json()
        dispatch(removeTodo(removedTodo))
    } catch (e) {
        dispatch(displayAlertP(e))
    }
}

export const completedTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        })
        const completedTodo = await response.json()
        dispatch(completeTodo(completedTodo))
    } catch (e) {
        dispatch(displayAlert(e))
    }
}

export const displayAlert = (text) => {
    alert(`You have an error: ` + text)
}