import { Home } from './pages/Home';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { LogIn } from './pages/LogIn';

function App() {
  return (
    <div className="App">
     <Routes>
          <Route
            exact
            path="/"
            element={
              <Home/>
            }
          />
             <Route
            exact
            path="/logIn"
            element={
              <LogIn/>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
