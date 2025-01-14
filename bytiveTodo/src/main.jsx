import ReactDOM from "react-dom/client"; 
import { Provider } from "react-redux";
import store from "./Store";
import App from "./App";
import './App.css'

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
