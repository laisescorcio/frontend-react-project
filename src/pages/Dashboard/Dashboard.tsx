import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { apiBase } from "../../services/api";
import styles from "./Dashboard.module.scss";
import { ClipLoader } from "react-spinners";

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
      setLoading(true);
      const response = await apiBase.get<User>("/auth/profile");
      setUser(response.data);
    } catch (err) {
      setError("Error loading user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <ClipLoader color="#fff" size={16} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.dashboard}>
      <header>
        <h1 className={styles.title}>Welcome, {user?.name}!</h1>
      </header>

      <section className={styles.profile}>
        {user?.avatar && (
          <img
            className={styles.avatar}
            src={user.avatar}
            alt={`${user.name}'s avatar`}
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
            <strong>Role:</strong> {user?.role}
          </li>
          <li className={styles.profileInformationItem}>
            {user?.creationAt && (
              <>
                <strong>Created at:</strong>{" "}
                {new Date(user?.creationAt).toLocaleString()}
              </>
            )}
          </li>
          <li className={styles.profileInformationItem}>
            {user?.updatedAt && (
              <>
                <strong>Updated at:</strong>{" "}
                {new Date(user?.updatedAt).toLocaleString()}
              </>
            )}
          </li>
        </ul>
      </section>

      <button className={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </main>
  );
};

export default Dashboard;
