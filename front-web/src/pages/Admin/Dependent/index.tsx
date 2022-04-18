import { useCallback, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { Guest } from "../../../types/Guests";
import { getSessionData } from "../../../utils/auth";
import { makePrivateRequest } from "../../../utils/request";
import DependentForm from "./Form";
import DependentList from "./List";

import "./styles.scss";

export default function Dependent() {
  const [currentUser, setCurrentUser] = useState(0);
  const [guest, setGuest] = useState<Guest>();
  const history = useHistory();
  const [confirm, setConfirm] = useState(0);


  const getGuest = useCallback(() => {
    const currentUserData = getSessionData();
    setCurrentUser(currentUserData.userId);
    makePrivateRequest({ url: `/guests/dependent/${currentUser}` }).then(
      (response) => {
        setGuest(response.data);
        console.log(response.data);
        response.data.status ? setConfirm(1) : setConfirm(0);
      }
    );

  }, [currentUser]);

  const onCreate = () => {
    history.push("/admin/dependents/create");
  }

  const handleRefresh = () => {
    getGuest();
  }

  useEffect(() => {
    getGuest();
  }, [currentUser, getGuest]);

  return (
    <div className="dependent-container">
        <Switch>
          <Route path="/admin/dependents" exact ><DependentList guest={guest} handleRefresh={handleRefresh} onCreate={onCreate} confirm={confirm}/></Route>
          <Route path="/admin/dependents/:dependentId" ><DependentForm handleRefresh={handleRefresh} guest_id={guest?.id}/> </Route>
        </Switch>
    </div>
  );
}
