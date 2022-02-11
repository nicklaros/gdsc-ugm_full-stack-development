# Steps

## Lets start by building our frontend

We will use [Create React App](https://github.com/facebookincubator/create-react-app) to initialize our frontend.  
Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.

```
npx create-react-app frontend

cd frontend

npm start
```

After that you can open newly created frontend on http://localhost:3000.

Main React component that used to render the page is `src/App.js`. Open that file and try making changes to jsx, once you save the file, the app will reflect the changes almost instantly.

## Get familiar with jsx

Now lets delete all jsx and start writing our todo app.

```html
<div>
  <h1>Learn full stack development todos:</h1>

  <ul>
    <li>Build frontend</li>
    <li>Build backend</li>
    <li>Connect frontend to backend</li>
  </ul>

  <input type="text" name="name" />
  <button>Add</button>
</div>
```

You can also add some styling to it if you want.

## Creating Component

Our app looks good, and if we look the jsx basically there are 3 sections in our app
- header
- todo list
- form to add new todo

Lets break it down by making each of the sections a component of each own so it becomes more reusable.

For our header, we will make it component so when it get used on other places, the view will be consistent.

```javascript
function Header(props) {
  return <h1>{props.text}</h1>
}
```

> Note:
> - Function components

Note that it accept props parameter which contains all given attributes when it used by other component. In this case, we expect it to be given `text` attribute.

```html
<Header text="Learn full stack development todos:" />
```

The second component is todo list. We want our app to be able to display dynamic todos so we expose props where other component can provide a list of todos to display.

```javascript
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

```

> Note:
> - Component composition
> - Conditional rendering
> - React fragments (`<>...</>` tag)

We can then use it like this:

```javascript
const todos = {
  "Build frontend": false,
  "Build backend": false,
  "Connect frontend to backend": false,
}

<TodoList todos={todos} />
```

The third component is form to add new todo.

```javascript
function AddTodoForm(props) {
  return (
    <>
      <input type="text" name="name" />
      <button>Add</button>
    </>
  )
}
```

For now it will not do anything fancy. We'll get back to it later.

Our main React component now will looks like this.

```javascript
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
```

## Marking todo as done

When we done with a todo we want to mark it as completed. In our case we will strikethrough our completed todo to mark it as done.

When user click a todo item, we want to toggle todo completion status, lets change TodoList component by placing `onClick` listener on our todo item, the handler is given via `onItemClick` prop.

```javascript
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
```

> Note: 
> - `onClick` attribute
> - `props.onItemClick` attribute

Then, we need to store our todos in a state so we can add some interactivity by changing the state.

```javascript
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState({
    "Build frontend": false,
    "Build backend": false,
    "Connect frontend to backend": false,
  })

  const handleItemClick = (todo) => {
    setTodos({
      ...todos,
      [todo]: !todos[todo],
    })
  }

  return (
    <div>
      <Header text="Learn full stack development todos:" />

      <TodoList todos={todos} onItemClick={handleItemClick} />

      <AddTodoForm />
    </div>
  );
}
```

> Note: 
> - `handleItemClick` handler function
> - `useState` react function

## Adding new todo

Add interactivity on add todo form.

```javascript
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
```

Then we change our main App component.

```javascript
function App() {
  const [todos, setTodos] = useState({
    "Build frontend": false,
    "Build backend": false,
    "Connect frontend to backend": false,
  })

  const handleItemClick = (todo) => {
    setTodos({
      ...todos,
      [todo]: !todos[todo],
    })
  }

  const handleAdd = (todo) => {
    setTodos({
      ...todos,
      [todo]: false,
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
```

> Note:
> - `setTodos` function

## It's time to build our backend

We will use nodejs and express framework for our backend.

```bash
mkdir backend

cd backend

npm init

npm install express
```

Use ES module by adding `type` with value `module` in package.json.

```json
{
  ...
  "type": "module",
  ...
}
```

Lets create our main file as indicated in package.json, eg: `index.js`.

```javascript
import express from 'express'

// Instantiate express app.
const app = express()

// Make our app can parse json in request body.
app.use(express.json())

// Port for exposing our app.
const port = 3001

// Listen on exposed port.
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
```

Our backend will need to have 3 capabilities:
- list all todos
- add new todo
- toggle todo

We will create each of those capabilities as endpoint exposed via http.

### List all todos

```javascript
...

// For the sake of simplicity, for now we will use in memory variable to store our todos.
const todos = {}

// Endpoint for listing todos.
app.get('/list', (req, res) => {
  res.json({
    todos,
  })
})

...
```

### Add new todo

```javascript
... 

// Endpoint for adding new todo.
app.post('/add', (req, res) => {
  todos[req.body.name] = req.body.completed

  res.json({
    error: null,
  })
})

...
```

### Toggle todo

```javascript
...

// Endpoint for toggling todo.
app.post('/toggle', (req, res) => {
  const completed = todos[req.body.name]

  todos[req.body.name] = !completed

  res.json({
    error: null,
  })
})

...
```
