import React, { useEffect } from "react"
import { connect } from "react-redux"
import TodoListItem from './TodoListItem'
import NewTodoForm from "./NewTodoForm"
import { removeTodo } from "./actions"
import { displayAlert } from "./thunks"
import { loadTodos } from "./thunks"
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
    todos: state.todos,
    isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onDisplayAlertClicked: () => dispatch(displayAlert),
    startLoadingTodos: () => dispatch(loadTodos)
})

export default connect(mapStateProps, mapDispatchToProps)(TodoList)