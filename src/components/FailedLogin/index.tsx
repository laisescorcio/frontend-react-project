import styles from "./FailedLogin.module.scss";

const FailedLogin = () => {
  return (
    <p className={styles.failedLogin}>
      Falha no login. Por favor, verifique seu e-mail e senha ou tente
      novamente.
    </p>
  );
};

export default FailedLogin;
