import React, { useState, useEffect } from 'react';
import axios from "axios";

function Header(props) {
  return <h1>{props.text}</h1>
}

// props.todos is object which contains list of todos.
// The key is the name of todo.
// The value is completion status.
// eg:
// {
//   "Name of todo": false
// }
function TodoList(props) {
  const todoNames = Object.keys(props.todos)

  const items = todoNames.map((name) => {
    return (
      <li key={name} onClick={() => props.onItemClick(name)}>
        <TodoItem name={name} completed={props.todos[name]} />
      </li>
    )
  })

  return (
    <ul>{items}</ul>
  )
}

function TodoItem(props) {
  return (
    <>
      {props.completed ? <strike>{props.name}</strike> : props.name}
    </>
  )
}

function AddTodoForm(props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    props.onSubmit(value)

    setValue("")
  }

  return (
    <>
      <input
        type="text"
        name="name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </>
  )
}

function App() {
  const [todos, setTodos] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3001/list").then((res) => {
      setTodos(res.data.todos)
    })
  }, []);

  const handleItemClick = (todo) => {
    const toggleTodo = {
      name: todo,
    }

    axios.post("http://localhost:3001/toggle", toggleTodo).then(() => {
      setTodos({
        ...todos,
        [todo]: !todos[todo],
      })
    })
  }

  const handleAdd = (todo) => {
    const newTodo = {
      name: todo,
      completed: false
    }

    axios.post("http://localhost:3001/add", newTodo).then(() => {
      setTodos({
        ...todos,
        [todo]: false,
      })
    })
  }

  return (
    <div>
      <Header text="Learn full stack development todos:" />

      <TodoList todos={todos} onItemClick={handleItemClick} />

      <AddTodoForm onSubmit={handleAdd} />
    </div>
  );
}

export default App;
