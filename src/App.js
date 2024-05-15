import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Route from "./route";
import "./App.css";
import "./css/dashboard.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route />
      </Router>
    </Provider>
  );
}

export default App;
