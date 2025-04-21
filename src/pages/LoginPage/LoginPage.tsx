import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./LoginPage.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginSchema, TLoginDataSchema } from "../../utils/loginSchema";
import { useAuth } from "../../providers/AuthProvider";
import FailedLogin from "../../components/FailedLogin";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginDataSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginDataSchema) => {
    setIsLoading(true);
    const result = await login(data);

    if (result) {
      setIsLoading(false);

      navigate("/dashboard");
      setIsError(false);

      return;
    }

    setIsLoading(false);
    setIsError(true);
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.loginTitle}>Login</h2>
        <Input
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
        {isError && <FailedLogin />}
        <Button text="Login" type="submit" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default LoginPage;
