import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

import Home from "./components/Home";
import Events from "./components/Events";
import Event from "./components/Event";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/event/:id" element={<Event/>}/>
          <Route path="/" element={<Navigate replace to="/home" />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
