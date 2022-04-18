import "./styles.scss";
import Pagination from "../../../../assets/components/Pagination";
import { GuestResponse } from "../../../../types/Guests";
import { Link } from "react-router-dom";
import GuestCard from "../GuestCard";
import { ReactComponent as SearchIcon } from "../../../../assets/images/serach-icon.svg";


type Props = {
  guestsResponse?: GuestResponse;
  activePage: number;
  handleChangePage: (page: number) => void;
  handleChangeName: (name: string) => void;
  name: string;
}

export default function GuestList( { guestsResponse, name, handleChangeName, activePage, handleChangePage } : Props) {
  return (
    <>
    <div className="card-list">
      <div className="card-base border-radius-20 input-search">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar Convidado"
                value={name}
                onChange={(event) => handleChangeName(event.target.value)}
              />
              <SearchIcon />
        </div>

      <div className="guest-content">
        {guestsResponse?.content.map((guest) => (
          <Link
            to={`/admin/guests/${guest.id}`}
            key={guest.id}
            className="guest-link"
          >
            <GuestCard guest={guest} />
          </Link>
        ))}
      </div>
      {guestsResponse && guestsResponse.totalPages > 1 && (
        <Pagination
          totalPages={guestsResponse.totalPages}
          activePage={activePage}
          onChange={(page) => handleChangePage(page)}
        />
      )}
      </div>
    </>
  );
}
