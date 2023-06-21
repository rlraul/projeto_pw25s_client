import { NavLink } from "react-router-dom";
import AuthService from "../../service/AuthService";

export function NavBar() {
  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPrincipal" aria-controls="navbarPrincipal" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarPrincipal">
            <ul className="navbar-nav me-auto">
                <li className="nav-item me-auto">
                    <NavLink
                      to="/"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                </li>
                <li className="nav-item me-auto">
                    <NavLink
                      to="/categories"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Categorias
                    </NavLink>
                </li>
                <li className="nav-item me-auto">
                    <NavLink
                      to="/accounts"
                      className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Suas Contas
                    </NavLink>
                </li>

                <li className="nav-item me-auto">
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
      </div>
  </nav>   
  );
}