import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { Guest } from "../../../types/Guests";
import { getSessionData } from "../../../utils/auth";
import { makePrivateRequest } from "../../../utils/request";
import DependentForm from "./Form";
import DependentList from "./List";

import "./styles.scss";

export default function Dependent() {
  const [currentUser, setCurrentUser] = useState(3);
  const [guest, setGuest] = useState<Guest>();
  const history = useHistory();

  async function getGuest() {
    const currentUserData = await getSessionData();
    setCurrentUser(currentUserData.userId);
    makePrivateRequest({ url: `/guests/dependent/${currentUser}` }).then(
      (response) => {
        setGuest(response.data);
        console.log(response.data);
      }
    );
  }

  const onCreate = () => {
    history.push("/admin/dependents/create");
  }

  const handleRefresh = () => {
    getGuest();
  }

  useEffect(() => {
    getGuest();
  }, []);

  return (
    <div className="dependent-container">
      <div className="dependent-content card-base">
        <Switch>
          <Route path="/admin/dependents" exact ><DependentList guest={guest} handleRefresh={handleRefresh} onCreate={onCreate}/></Route>
          <Route path="/admin/dependents/:dependentId" ><DependentForm handleRefresh={handleRefresh} guest_id={guest?.id}/> </Route>
        </Switch>
      </div>
    </div>
  );
}
