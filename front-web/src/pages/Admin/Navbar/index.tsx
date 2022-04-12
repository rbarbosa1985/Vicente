import { Link, NavLink, useLocation } from "react-router-dom";
import "./styles.scss";
import {
  getAccessTokenDecode,
  isAuthenticated,
  logout,
} from "../../../utils/auth";
import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/images/serach-icon.svg";

type Props = {
  name?: string;
  handleChangeName: (name: string) => void;
  qtd?: number;
};

export default function Navbar({ name, handleChangeName, qtd }: Props) {
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
    <nav className="row main-nav card-base border-radius-20">
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
            <div className="input-search">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar Convidado"
                value={name}
                onChange={(event) => handleChangeName(event.target.value)}
              />
              <SearchIcon />
            </div>
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
          <>
            {" "}
            {currentUser}{" "}
            <a
              href="#logout"
              className="nav-link active d-inline"
              onClick={handleLogout}
            >
              LOGOUT
            </a>{" "}
          </>
        )}
        {!currentUser && (
          <Link className="nav-link active" to="/auth/login">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
