import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { apiBase } from "../../services/api";
import styles from "./Dashboard.module.scss";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer";
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const response = await apiBase.get<User>("/auth/profile");
      setUser(response.data);
    } catch (err) {
      setError("Erro ao carregar dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.dashboard}>
      <header>
        <h1 className={styles.title}>Bem-vindo, {user?.name}!</h1>
      </header>

      <section className={styles.profile}>
        {user?.avatar && (
          <img
            className={styles.avatar}
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
          />
        )}

        <ul className={styles.profileInformation}>
          <li className={styles.profileInformationItem}>
            <strong>ID:</strong> {user?.id}
          </li>
          <li className={styles.profileInformationItem}>
            <strong>Email:</strong> {user?.email}
          </li>
          <li className={styles.profileInformationItem}>
            <strong>Função:</strong> {user?.role}
          </li>
          <li className={styles.profileInformationItem}>
            {user?.creationAt && (
              <>
                <strong>Criado em:</strong>{" "}
                {new Date(user?.creationAt).toLocaleString()}
              </>
            )}
          </li>
          <li className={styles.profileInformationItem}>
            {user?.updatedAt && (
              <>
                <strong>Atualizado em:</strong>{" "}
                {new Date(user?.updatedAt).toLocaleString()}
              </>
            )}
          </li>
        </ul>
      </section>

      <button className={styles.logoutButton} onClick={logout}>
        Sair
      </button>
    </main>
  );
};

export default Dashboard;
