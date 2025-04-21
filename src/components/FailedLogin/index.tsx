import styles from "./FailedLogin.module.scss";

const FailedLogin = () => {
  return (
    <p className={styles.failedLogin}>
      "Login failed. Please check your email and password or try again."
    </p>
  );
};

export default FailedLogin;
