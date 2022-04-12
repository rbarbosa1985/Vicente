import "./styles.scss";
import Pagination from "../../../../assets/components/Pagination";
import { GuestResponse } from "../../../../types/Guests";
import { Link } from "react-router-dom";
import GuestCard from "../GuestCard";

type Props = {
  guestsResponse?: GuestResponse;
  activePage: number;
  handleChangePage: (page: number) => void;
}

export default function GuestList( { guestsResponse, activePage, handleChangePage } : Props) {
  return (
    <>
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
    </>
  );
}
