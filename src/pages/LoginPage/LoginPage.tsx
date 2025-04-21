import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./LoginPage.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginSchema, TLoginDataSchema } from "../../utils/loginSchema";
import { useAuth } from "../../providers/AuthProvider";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginDataSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginDataSchema) => {
    const result = await login(data);

    if (result) {
      navigate("/dashboard");
      return;
    }

    alert("Não foi possivel fazer o login");
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Input
          placeholder="Digite seu email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          placeholder="Digite sua senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button text="Entrar" type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
