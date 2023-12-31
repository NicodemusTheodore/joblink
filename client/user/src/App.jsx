import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import store from "./stores";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
