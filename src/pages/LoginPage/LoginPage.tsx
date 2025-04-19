import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginSchema } from "../../utils/loginSchema";

interface LoginPageProps {
  onLogin: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });
    console.log({ password });
    const result = loginSchema.safeParse({ email, password });

    console.log({ result });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Erro de validação";
      setError(firstError);
      return;
    }

    if (email === "admin@email.com" && password === "123456") {
      setError("");

      onLogin(true);
      localStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <Input
          type="password"
          value={password}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <Button text="Entrar" type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
