import { Switch } from "react-router-dom";
import PrivateRoute from "../../Routes/PrivateRoute";
import Dependent from "./Dependent";
import Guests from "./Guests";

import './styles.scss';

export default function Admin(){
  return(
    <div className="admin-container">
        <Switch>
          <PrivateRoute path="/admin/guests" allowedRoutes={['ROLE_ADMIN']} ><Guests/></PrivateRoute>
          <PrivateRoute path="/admin/dependents"><Dependent/></PrivateRoute>
        </Switch>
    </div>
  )
}