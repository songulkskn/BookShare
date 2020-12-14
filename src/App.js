import React, { useState, useMemo } from 'react'; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AppBar from './components/AppBar';
import {UserContext} from './UserContext';
function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser]);
  return (
    <>
    <Router>
    <UserContext.Provider value={value}>
      <AppBar />
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Login" exact component={Login} />
          <Route path="/SignUp" exact component={SignUp} />
      </Switch>
      </UserContext.Provider>
    </Router>
  </>
  );
}

export default App;
