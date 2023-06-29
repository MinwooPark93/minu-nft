import "./App.css";
import { useState } from "react";
import MainMint from "./MainMint";
import NavBar from "./NavBar";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <NavBar props={{ accounts, setAccounts }} />
      <MainMint props={{ accounts, setAccounts }} />
    </div>
  );
}

export default App;
