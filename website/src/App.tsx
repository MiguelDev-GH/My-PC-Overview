import NavBar from "./components/NavBar"
import "./App.css"
import { HashRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Download from "./pages/Download"
import Documentation from "./pages/Documentation"

const App = () => {
  return <div className="App">

    <HashRouter>

      <NavBar/>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/download" element={<Download />}/>
        <Route path="/documentation" element={<Documentation/>}/>
      </Routes>
    </HashRouter>
    
  </div>
}

export default App