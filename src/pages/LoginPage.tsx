import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <form className={styles.loginForm}>
        <h2>Login</h2>
        <input placeholder="Email" />
        <input placeholder="Senha" type="password" />
        <button>Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
