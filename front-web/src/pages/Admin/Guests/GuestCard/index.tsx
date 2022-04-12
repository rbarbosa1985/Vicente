import { Guest } from "../../../../types/Guests";
import "./styles.scss";

type Props={
  guest: Guest
}

export default function GuestCard({ guest }: Props) {
  return (
    <div className="card-base border-radius-10 guest-card">
      <div className="guest-info">
        <h6 className="guest-name">{guest.name}</h6>
        <h6 className="guest-telefone">{guest.telephone}</h6>
        <h6 className="guest-email">{guest.email}</h6>
      </div>
      <div className="guest-dependent">
        <h6>Confirmado:</h6>
        <h6 className="guest-status"> {guest.status ? "SIM" : "NÃO"}</h6>
      </div>
      <h6 className="guest-invite">Convites: {guest.invitation}</h6>
    </div>
  );
}
