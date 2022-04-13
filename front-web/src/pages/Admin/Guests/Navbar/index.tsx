import { Link, NavLink, useLocation } from "react-router-dom";
import "./styles.scss";
import {
  getAccessTokenDecode,
  logout,
} from "../../../../utils/auth";
import { useEffect, useState } from "react";

type Props = {
  qtd?: number;
};

export default function Navbar({ qtd }: Props) {
  const [currentUser, setCurrentUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentUserData = getAccessTokenDecode();
    setCurrentUser(currentUserData.user_name);
  }, [location]);

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    logout();
  };

  return (
    <nav className="row main-nav card-base ">
      <div className="col-3">
        <Link to="/" className="nav-logo-text">
          <h4>Vicente faz 1 ano!</h4>
        </Link>
      </div>
      <div className="col-6">
        <ul className="main-menu">
          <li>
            <NavLink className="nav-link" to="/admin/guests" exact>
              Lista de Convidados
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/guests/create">
              Adicionar Convidados
            </NavLink>
          </li>
          <li>
            <p className="nav-link">
              Quantidade de Convidados: {qtd}
            </p>
          </li>
        </ul>
      </div>
      <div className="col-3 nav-user">
        {currentUser && (
          
            <a
              href="#logout"
              className="nav-link active d-inline"
              onClick={handleLogout}
            >
              SAIR
            </a>
        )}
      </div>
    </nav>
  );
}
