import AppNavBar from "./components/AppNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <ItemModal />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
