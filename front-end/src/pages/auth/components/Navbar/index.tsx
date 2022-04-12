import "./styles.scss";

export default function NavBar() {
  return (
    <div className="row home-options card-base border-radius-20">
      <div className="col-3">
        <h4>Vicente</h4>
      </div>
      <div className="col-6 nav-options">
        <button className="btn btn-primary">Adcionar Convidado</button>
        <div className="options-search">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar Convidado"
          />
        </div>
        <div className="options-guests">
          <button type="button" className="btn btn-primary">
            Notifications <span className="badge badge-light">50</span>
          </button>
          <h6>Quantidade de Convidados</h6>
          <h6>15</h6>
        </div>
      </div>
      <div className="col-3">LOGOUT</div>
    </div>
  );
}
