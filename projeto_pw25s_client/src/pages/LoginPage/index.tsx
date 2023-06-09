import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonWithProgress } from "../../ButtonWithProgress";
import AuthService from "../../service/AuthService";
import { IUserLogin } from "../../commons/interfaces";
import { Card, CardBody, CardFooter, CardHeader, Input } from "@chakra-ui/react";

export function LoginPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [apiError, setApiError] = useState(false);
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
          return {
            ...previousForm,
            [name]: value,
          };
        });
        setApiError(false);
      };
    
    const onClickLogin = () => {
        const user: IUserLogin = {
          username: form.username,
          password: form.password,
        };
        setPendingApiCall(true);
        AuthService.login(user)
              .then((response)=>{
                setUserAuthenticated(true);
                setApiError(false);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                navigate("/home");
              })
              .catch((responseError) => {
                setUserAuthenticated(false);
                setApiError(true);
              })
              .finally( () => {
                setPendingApiCall(false);
              });
      };
    
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Card p={2} w={400}>
          <CardHeader p={0}>
            <h1 className="text-center">Login</h1>
          </CardHeader>

          <CardBody>
            <div className="col-12 mb-2">
                  <label>Informe seu username</label>
                  <Input
                      className={apiError ? "form-control is-invalid" : "form-control"}
                      type="text"
                      placeholder="Informe o seu username"
                      name="username"
                      onChange={onChange}
                      value={form.username}
                  />
              </div>

              <div className="col-12 mb-2">
                  <label>Informe sua senha</label>
                  <Input
                      className={apiError ? "form-control is-invalid" : "form-control"}
                      type="password"
                      placeholder="Informe a sua senha"
                      name="password"
                      onChange={onChange}
                      value={form.password}
                  />
              </div>
          </CardBody>
          
          <CardFooter p={0}>
            <div className="text-center w-100">
              <div>
                <ButtonWithProgress 
                    onClick={onClickLogin} 
                    className="btn btn-success m-2"
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
          </CardFooter>
        </Card>
      </div>
    );
}