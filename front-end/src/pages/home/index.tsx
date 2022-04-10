import "./styles.scss";

export default function Home() {
  return (
    <div className="home-container">
      <div className="row home-content card-base border-radius-20">
        <div >
          <h1 className="text-title">
            Vicente
          </h1>
          <h2>
            1 ano
          </h2>
          <p className="text-subtitle">
            Ajudaremos a você a encontrar os melhores <br />
            produtos disponíveis no mercado.
          </p>
          {/* <Link to="/products">
            <ButtonIcon text="inicie agora a sua busca" />
          </Link> */}
        </div>
        <div >
          {/* <MainImage className="main-image" /> */}
        </div>
      </div>
    </div>
  );
}
