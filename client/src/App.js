import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import DeleteAccount from "./components/DeleteAccount";

const ROUTES = [
  {"url": "/home",
  "component": <Home/>},
  {"url": "/events/:id",
  "component": <Event/>},
  {"url": "/events",
  "component": <Events/>},
  {"url": "/search",
  "component": <SearchSneakers/>},
  {"url": "/login",
  "component": <Login/>},
  {"url": "/register",
  "component": <Register/>},
  {"url": "/favorites",
  "component": <Favorites/>},
  {"url": "/followed",
  "component": <Followed/>},
  {"url": "/account",
  "component": <AccountSettings/>},
  {"url": "/account/delete",
  "component": <DeleteAccount/>},
  {"url": "/",
  "component": <Navigate replace to="/home"/>},
]

function App() {
  const [username, setUsername] = useState();
  return (
    <div className="App">
      <AuthContext.Provider value={{ username, setUsername }}>
        <BrowserRouter>
          <SiteNavbar/>
          <Routes>
            {
              ROUTES.map((page) => {
                return (
                  <Route
                    path={page.url} 
                    element={page.component}
                    key={page.url}
                  />
                );
              })
            }
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
