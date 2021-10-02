import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "./actions";
import './NewTodoForm.css'

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('')

    return (
        <div className="new-todo-form">
            <input
                className="new-todo-input"
                type="text"
                placeholder="Type your new todo item"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button
                className="new-todo-button"
                onClick={() => {
                    const isDuplicatedText = 
                        todos.some(todo => todo.text === inputValue)
                    if(!isDuplicatedText) {
                        onCreatePressed(inputValue)
                        setInputValue('')
                    }
                }}    
            >Create Todo</button>
        </div>
    )
}

const mapStateProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(createTodo(text))
})

export default connect(mapStateProps, mapDispatchToProps)(NewTodoForm)