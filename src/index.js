import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { getSnapshot } from "mobx-state-tree";
import App from './App';
import { RootStore } from "./store/Contacts"
import reportWebVitals from './reportWebVitals';

let initialState = {
  contacts: [
    {
      id: 1,
      name: "john doe",
      email: "johnjohn@mail.com",
      phoneNumber: 12345,
    },
    {
      id: 2,
      name: "jean doe",
      email: "jeanjean@mail.com",
      phoneNumber: 54321,
    }
  ]
}

let store = RootStore.create(initialState)

console.log(getSnapshot(store));

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();