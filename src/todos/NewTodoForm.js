import React, { useState } from "react";
import './NewTodoForm.css'

const NewTodoForm = () => {
    const [inputValue, setInputValye] = useState('')

    return (
        <div className="new-todo-form">
            <input
                className="new-todo-input"
                type="text"
                placeholder="Type your new todo item"
                value={inputValue}
                onChange={e => setInputValye(e.target.value)}
            />
            <button className="new-todo-button">Create Todo</button>
        </div>
    )
}

export default NewTodoForm