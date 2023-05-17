import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonWithProgress } from "../../ButtonWithProgress";
import AuthService from "../../service/AuthService";
import { IUserLogin } from "../../commons/interfaces";

export function LoginPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [apiError, setApiError] = useState(false);
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();

    const onClickLogin = () => {
        const user: IUserLogin = {
          username: form.username,
          password: form.password,
        };
        console.log(user);
        setPendingApiCall(true);
        AuthService.login(user)
              .then((response)=>{
                console.log(response.data);
                setUserAuthenticated(true);
                setApiError(false);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                navigate("/home");
              })
              .catch((responseError) => {
                console.log(responseError.response);
                setUserAuthenticated(false);
                setApiError(true);
              })
              .finally( () => {
                setPendingApiCall(false);
              });
        console.log("DEPOIS DO POST DO AXIOS");
      };
    
    return (
        <div className="d-flex align-items-center justify-content-center vw-100">
            <div className="row">
                <h1 className="text-center">Login</h1>
                <div className="container border border-secondary rounded p-2">
                    <div className="col-12 mb-2">
                        <label>Informe seu username</label>
                        <input
                            className={apiError ? "form-control is-invalid" : "form-control"}
                            type="text"
                            placeholder="Informe o seu username"
                            name="username"
                            //onChange={onChange}
                            value={form.username}
                        />
                    </div>
                    <div className="col-12 mb-2">
                        <label>Informe sua senha</label>
                        <input
                            className={apiError ? "form-control is-invalid" : "form-control"}
                            type="password"
                            placeholder="Informe a sua senha"
                            name="password"
                            //onChange={onChange}
                            value={form.password}
                        />
                    </div>
                    <div className="text-center">
                        <ButtonWithProgress 
                            onClick={onClickLogin} 
                            className="btn btn-primary m-2"
                            disabled={pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text="Autenticar"
                        />
                        {userAuthenticated && <div className="alert alert-success">Usuário autenticado com sucesso!</div>}
                        {apiError && <div className="alert alert-danger">Falha ao autenticar o usuário.</div>}
                    </div>
                    <div className="text-center mt-2">
                        <div className="row">
                            <span>Não possui cadastro? </span>
                            <Link className="text-primary" to="/signup">Cadastrar-se</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}