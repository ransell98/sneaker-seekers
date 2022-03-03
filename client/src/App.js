import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from "./contexts/AuthContext";
import { logout, refresh } from "./services/auth-api";
import PreviousPageContext from "./contexts/PreviousPageContext";

import SiteNavbar from "./components/SiteNavbar";
import Home from "./components/Home";
import Events from "./components/Events";
import Event from "./components/Event";
import TableForm from "./components/TableForm";
import SearchSneakers from "./components/SearchSneakers";
import User from "./components/User";
import Login from "./components/Login";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import Followed from "./components/Followed";
import UpgradeRequests from "./components/UpgradeRequests";
import AccountSettings from "./components/AccountSettings";
import DeleteAccount from "./components/DeleteAccount";

const ROUTES = [
  {"uri": "/home",
  "component": <Home/>},
  {"uri": "/events/:id",
  "component": <Event/>},
  {"uri": "/events",
  "component": <Events/>},
  {"uri": "/events/:id/booktable",
  "component": <TableForm/>},
  {"uri": "/search",
  "component": <SearchSneakers/>},
  {"uri": "/users/:username",
  "component": <User/>},
  {"uri": "/login",
  "component": <Login/>},
  {"uri": "/register",
  "component": <Register/>},
  {"uri": "/favorites",
  "component": <Favorites/>},
  {"uri": "/followed",
  "component": <Followed/>},
  {"uri": "/upgraderequests",
  "component": <UpgradeRequests/>},
  {"uri": "/account",
  "component": <AccountSettings/>},
  {"uri": "/account/delete",
  "component": <DeleteAccount/>},
  {"uri": "/",
  "component": <Navigate replace to="/home"/>},
]

function App() {
  const [credentials, setCredentials] = useState();
  const [previousPage, setPreviousPage] = useState("/");

  useEffect(() => {
    refresh()
      .then(principal => setCredentials(principal))
      .catch(() => setCredentials());
  }, []);
  
  const auth = {
    credentials,
    login: (principal) => setCredentials(principal),
    logout: () => {
      logout().finally(() => setCredentials());
    }
  };

  const prevPage = {
    previousPage: previousPage,
    setPreviousPage: (page) => setPreviousPage(page)
  }

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <PreviousPageContext.Provider value={prevPage}>
          <BrowserRouter>
            <SiteNavbar/>
            <Routes>
              {
                ROUTES.map((page) => {
                  return (
                    <Route
                      path={page.uri} 
                      element={page.component}
                      key={page.uri}
                    />
                  );
                })
              }
            </Routes>
          </BrowserRouter>
        </PreviousPageContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
