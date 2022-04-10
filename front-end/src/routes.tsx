import { Route, Router, Switch } from "react-router-dom";
import Login from "./pages/auth/login";

import Home from "./pages/home";
import history from "./utils/history";

export default function Routes() {
  return  (
    <Router history={history}>
      <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/login" ><Login/></Route>
      </Switch>
    </Router>
  )
}