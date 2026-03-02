import NavBar from "./components/NavBar"
import "./App.css"
import { HashRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Download from "./pages/Download"

const App = () => {
  return <div className="App">

    <HashRouter>

      <NavBar/>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/download" element={<Download />}/>
      </Routes>
    </HashRouter>
    
  </div>
}

export default App