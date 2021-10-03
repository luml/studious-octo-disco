import React, { useEffect } from "react"
import { connect } from "react-redux"
import TodoListItem from './TodoListItem'
import NewTodoForm from "./NewTodoForm"
import { displayAlert } from "./thunks"
import {
    getTodos,
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos
} from "./selectors"
import { loadTodos, removeTodoRequest, completedTodoRequest } from "./thunks"
import './TodoList.css'

const TodoList = ({ completedTodos, incompletedTodos, onCompletedPressed, onRemovePressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos()
    }, [])

    const loadingMessage = <div>Loading todos...</div>
    const content =
        (
            <div className="list-wrapper">
                <NewTodoForm />
                <h3>Incompleted:</h3>
                {incompletedTodos.map(todo => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
                <h3>Completed:</h3>
                {completedTodos.map(todo => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} />)}
            </div>

        )
    return isLoading ? loadingMessage : content
}

const mapStateProps = state => ({
    todos: getTodos(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state)
})

const mapDispatchToProps = dispatch => ({
    onCompletedPressed: id => dispatch(completedTodoRequest(id)),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onDisplayAlertClicked: () => dispatch(displayAlert),
    startLoadingTodos: () => dispatch(loadTodos)
})

export default connect(mapStateProps, mapDispatchToProps)(TodoList)