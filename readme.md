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
