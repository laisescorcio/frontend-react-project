import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { apiBase } from "../../services/api";

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
    <main>
      <header>
        <h1>Bem-vindo, {user?.name}!</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <section>
        {user?.avatar && (
          <img src={user.avatar} alt={`Avatar de ${user.name}`} />
        )}

        <ul>
          <li>
            <strong>ID:</strong> {user?.id}
          </li>
          <li>
            <strong>Email:</strong> {user?.email}
          </li>
          <li>
            <strong>Função:</strong> {user?.role}
          </li>
          <li>
            <strong>Criado em:</strong>{" "}
            {new Date(user?.creationAt).toLocaleString()}
          </li>
          <li>
            <strong>Atualizado em:</strong>{" "}
            {new Date(user?.updatedAt).toLocaleString()}
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;
