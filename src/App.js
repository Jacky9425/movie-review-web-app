import logo from "./logo.svg";
import "./App.css";
import MainApp from "./containers/MainApp";
import AppContextProvider from "./contexts/appContext";

function App() {
  return (
    <AppContextProvider>
      <MainApp />
    </AppContextProvider>
  );
}

export default App;
