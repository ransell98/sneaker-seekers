import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from "./contexts/AuthContext";

import SiteNavbar from "./components/SiteNavbar";
import Home from "./components/Home";
import Events from "./components/Events";
import Event from "./components/Event";
import SearchSneakers from "./components/SearchSneakers";
import Login from "./components/Login";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import Followed from "./components/Followed";
import AccountSettings from "./components/AccountSettings";

function App() {
  const [username, setUsername] = useState();
  return (
    <div className="App">
      <AuthContext.Provider value={{ username, setUsername }}>
        <Router>
          <SiteNavbar/>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/events/:id" element={<Event/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/search" element={<SearchSneakers/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/followed" element={<Followed/>}/>
            <Route path="/account" element={<AccountSettings/>}/>
            <Route path="/" element={<Navigate replace to="/home" />}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
