import { Redirect, Route, Router, Switch } from "react-router-dom";

import Home from "./pages/Home";
import history from "./utils/history";
import Login from "./pages/Auth/Login";
import Admin from "./pages/Admin";

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect from="/auth" to="/auth/login" exact />
        <Route path="/auth"><Login /></Route>
        <Redirect from="/admin" to="admin/guests" exact></Redirect>
        <Route path="/admin"><Admin/></Route>
      </Switch>
    </Router>
  );
}
