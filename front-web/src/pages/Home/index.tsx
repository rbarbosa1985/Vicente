import "./styles.scss";
import convite from "../../assets/images/convite.jpeg";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/auth");
  }

  return (
    <div className="container">
      <div className="home-content row card-base border-radius-20">
        <div className="col-6 home-text">
          <h1 className="text-title">
            Vicente
          </h1>
          <h2 className="text-title2">
            1 ano
          </h2>
          <p className="text-subtitle">
            Venha comemorar conosco<br />
            essa data tão especial!!
          </p>
          <h1 className="text-date">
            11/06/2022 às 16h
          </h1>
          <p className="text-address">
            Venha comemorar conosco<br />
            essa data tão especial!!
          </p>
          <button className="btn btn-lg btn-success " onClick={handleClick}>CONFIRME AGORA SUA PRESENÇA</button>
        </div>
        <div className="col-6">
          <img src={convite} alt="convite" className="convite" />
        </div>
      </div>
    </div>
  );
}
