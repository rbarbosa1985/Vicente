import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import { GuestResponse } from "../../../types/Guests";
import { makePrivateRequest } from "../../../utils/request";
import GuestForm from "./GuestForm";
import GuestList from "./GuestList";
import Navbar from "./Navbar";



import "./styles.scss";

export default function Guests() {
  const [guestsResponse, setGuestsResponse] = useState<GuestResponse>();
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState("");

  const getGuests = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 2,
      name,
    };
    makePrivateRequest({ url: "/guests", params }).then((response) =>
      setGuestsResponse(response.data)
    );
  }, [activePage, name]);

  useEffect(() => {
    getGuests();
  }, [getGuests]);

  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  };

  const handleChangePage = (page: number) => {
    setActivePage(page);
  };

  const handleRefresh = () => {
    getGuests();
  };

  return (
    <div className="guest-container">
      <Navbar
        qtd={guestsResponse?.totalElements}
      />
      <div className="guest-content-principal">
        
        <Switch>
          <Route path="/admin/guests" exact>
            <GuestList
              handleChangeName={handleChangeName}
              guestsResponse={guestsResponse}
              activePage={activePage}
              handleChangePage={handleChangePage}
              name={name}
            />
          </Route>
          <Route path="/admin/guests/:guestId">
            <GuestForm handleRefresh={handleRefresh} />{" "}
          </Route>
        </Switch>
      </div>
    </div>
  );
}
