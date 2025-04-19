import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface LoginPageProps {
  onLogin: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(true);
    navigate("/dashboard"); // redireciona
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <Input
          type="password"
          value={password || ""}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Entrar" type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
