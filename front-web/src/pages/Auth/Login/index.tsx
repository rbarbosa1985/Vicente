import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { makeLogin } from "../../../utils/request";
import { saveSessionData } from "../../../utils/auth";
import "./styles.scss";

type FormState = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

export default function Login() {
  const { register, handleSubmit, errors } = useForm<FormState>();
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  let location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/admin" } };

  const onSubmit = (data: FormState) => {
    makeLogin(data)
      .then((response) => {
        setHasError(false);
        saveSessionData(response.data);
        history.replace(from);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  return (
    <div className="auth-container">
      <div className="card-base auth-card border-radius-20">
        <h1 className="auth-card-title">LOGIN</h1>
        {hasError && (
          <div className="alert alert-danger mt-5">
            Usuário ou senha inválidos.
          </div>
        )}
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="margin-bottom-30  login-input">
            <input
              type="email"
              placeholder="Email"
              name="username"
              ref={register({
                required: "Campo Obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido.",
                },
              })}
              className={`form-control input-base login-input ${
                errors.username ? "is-invalid" : ""
              }`}
            />
            {errors.username && (
              <div className="invalid-feedback d-block">
                {errors.username.message}
              </div>
            )}
          </div>
          <div className="margin-bottom-30  login-input">
            <input
              type="password"
              placeholder="Senha"
              name="password"
              ref={register({ required: "Campo Obrigatório." })}
              className={`form-control input-base${
                errors.password ? "is-invalid" : ""
              }`}
            />
            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password.message}
              </div>
            )}
          </div>
          <Link to="/auth/recover" className="login-link-recover">
            Esqueci a senha?
          </Link>
          <div className="login-submit">
            <button className="btn btn-lg btn-success login-btn">CONECTAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}
