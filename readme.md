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
