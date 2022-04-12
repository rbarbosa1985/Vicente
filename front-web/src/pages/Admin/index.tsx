import { Switch } from "react-router-dom";
import Guests from "./Guests";
import PrivateRoute from "../../Routes/PrivateRoute";
import './styles.scss';

export default function Admin(){
  return(
    <div className="admin-container">
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/guests"><Guests/></PrivateRoute>
        </Switch>
      </div>
    </div>
  )
}