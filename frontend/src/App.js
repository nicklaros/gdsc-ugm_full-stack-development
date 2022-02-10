import './App.css';

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
      <li key={name}>
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
  return (
    <>
      <input type="text" name="name" />
      <button>Add</button>
    </>
  )
}

function App() {
  const todos = {
    "Build frontend": false,
    "Build backend": false,
    "Connect frontend to backend": false,
  }

  return (
    <div>
      <Header text="Learn full stack development todos:" />

      <TodoList todos={todos} />

      <AddTodoForm />
    </div>
  );
}

export default App;
