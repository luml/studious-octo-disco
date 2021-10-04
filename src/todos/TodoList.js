import React, { useEffect } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import TodoListItem from './TodoListItem'
import NewTodoForm from "./NewTodoForm"
import { displayAlert } from "./thunks"
import {
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos
} from "./selectors"
import { loadTodos, removeTodoRequest, completedTodoRequest } from "./thunks"

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto
`

const TodoList = ({ completedTodos, incompletedTodos, onCompletedPressed, onRemovePressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos()
    }, [])

    const loadingMessage = <div>Loading todos...</div>
    const content =
        (
            <ListWrapper>
                <NewTodoForm />
                <h3>Incompleted:</h3>
                {incompletedTodos.map(todo => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
                <h3>Completed:</h3>
                {completedTodos.map(todo => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} />)}
            </ListWrapper>

        )
    return isLoading ? loadingMessage : content
}

const mapStateProps = state => ({
    isLoading: getTodosLoading(state),
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