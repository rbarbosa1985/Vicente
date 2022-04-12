import "./styles.scss";
export default function GuestCard() {
  return (
    <div className="card-base border-radius-10 guest-card">
      <div className="guest-info">
        <h6 className="guest-name">Roberto Barbosa</h6>
        <h6 className="guest-telefone">(21)97141-4389</h6>
        <h6 className="guest-email">betoanselmo@gmail.com</h6>
      </div>
      <div className="guest-dependent">
        <h6>Confirmado:</h6>
        <h6 className="guest-status"> Sim</h6>
      </div>
      <h6 className="guest-invite">Convites: 4</h6>
    </div>
  );
}
