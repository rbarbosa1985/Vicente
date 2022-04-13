import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import GuestForm from "./GuestForm";
import "./styles.scss";
import { GuestResponse } from "../../../types/Guests";
import { makePrivateRequest } from "../../../utils/request";
import { Route, Switch } from "react-router-dom";
import GuestList from "./GuestList";

export default function Guests() {
  const [guestsResponse, setGuestsResponse] = useState<GuestResponse>();
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState("");

  const getGuests = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 12,
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
        name={name}
        handleChangeName={handleChangeName}
        qtd={guestsResponse?.totalElements}
      />

      <Switch>
        <Route path="/admin/guests" exact>
          <GuestList
            guestsResponse={guestsResponse}
            activePage={activePage}
            handleChangePage={handleChangePage}
          />
        </Route>
        <Route path="/admin/guests/:guestId">
          <GuestForm handleRefresh={handleRefresh} />{" "}
        </Route>
      </Switch>
    </div>
  );
}
