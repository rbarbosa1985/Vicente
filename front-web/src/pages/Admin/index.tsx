import { Switch } from "react-router-dom";
import PrivateRoute from "../../Routes/PrivateRoute";
import Dependent from "./Dependent";
import DependentForm from "./Dependent/Form";
import Guests from "./Guests";

import './styles.scss';

export default function Admin(){
  return(
    <div className="admin-container">
      {/* <div className="admin-content"> */}
        <Switch>
          <PrivateRoute path="/admin/guests" allowedRoutes={['ROLE_ADMIN']} ><Guests/></PrivateRoute>
          <PrivateRoute path="/admin/dependents"><Dependent/></PrivateRoute>
        </Switch>
      {/* </div> */}
    </div>
  )
}