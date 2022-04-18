import { Link, NavLink, useLocation } from "react-router-dom";
import "./styles.scss";
import { getAccessTokenDecode, logout } from "../../../../utils/auth";
import { useEffect, useState } from "react";
import menu from "../../../../assets/images/menu.svg";

type Props = {
  qtd?: number;
};

export default function Navbar({ qtd }: Props) {
  const [drawerActive, setDrawerActive] = useState(false);
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
      <h4 className="nav-logo-text">Vicente faz 1 ano!</h4>

      <button
        className="menu-mobile-btn"
        type="button"
        onClick={() => setDrawerActive(!drawerActive)}
      >
        <img src={menu} alt="Mobile Menu" />
      </button>
      <div
        className={drawerActive ? "menu-mobile-container" : "menu-container"}
      >
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
            <p className="nav-link">Quantidade de Convidados: {qtd}</p>
          </li>
          <li className="nav-user">
            {currentUser && (
              <a
                href="#logout"
                className="nav-link active d-inline text-logout"
                onClick={handleLogout}
              >
                SAIR
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
