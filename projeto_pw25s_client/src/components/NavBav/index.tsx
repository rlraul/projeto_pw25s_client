import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import AuthService from "../../service/AuthService";

export function NavBar() {
  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <Link to="/" className="navbar-brand">
        <img src={logo} width="60" alt="UTFPR" />
        </Link> */}
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink
                      to="/"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                      to="/categories"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Categorias
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                      to="/accounts"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Suas Contas
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                      to="/movements"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Movimentações Financeiras
                    </NavLink>
                </li>
            </ul>
            <button className="btn btn-light" onClick={onClickLogout}> &times; Sair</button>
        </div>
    </nav>   
  );
}