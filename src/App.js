import "./App.css";
import NavbarPage from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NewCharacter from "./containers/NewCharacter";

function App() {
  return (
    <div>
      <NavbarPage />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/new" element={<NewCharacter />} />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
