import React, { useEffect } from "react"
import { connect } from "react-redux"
import TodoListItem from './TodoListItem'
import NewTodoForm from "./NewTodoForm"
import { displayAlert } from "./thunks"
import { getTodos, getTodosLoading } from "./selectors"
import { loadTodos, removeTodoRequest } from "./thunks"
import './TodoList.css'

const TodoList = ({ todos = [], onRemovePressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos()
    }, [])

    const loadingMessage = <div>Loading todos...</div>
    const content =
        (
            <div className="list-wrapper">
                <NewTodoForm />
                {/* TODO: onCompletedPressed */}
                {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} />)}
            </div>

        )
    return isLoading ? loadingMessage : content
}

const mapStateProps = state => ({
    todos: getTodos(state),
    isLoading: getTodosLoading(state)
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onDisplayAlertClicked: () => dispatch(displayAlert),
    startLoadingTodos: () => dispatch(loadTodos)
})

export default connect(mapStateProps, mapDispatchToProps)(TodoList)