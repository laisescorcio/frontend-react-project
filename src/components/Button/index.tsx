import { ClipLoader } from "react-spinners";
import styles from "./Button.module.scss";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  text?: string;
  type: string;
  isLoading: boolean;
}

export default function Button({ text, type, isLoading }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} type={type as ButtonType}>
        {isLoading ? <ClipLoader color="#fff" size={16} /> : text}
      </button>
    </div>
  );
}
