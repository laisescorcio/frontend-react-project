import styles from "./Button.module.scss";

type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
  text?: string;
  type: string;
};

export default function Button({ text, type }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} type={type as ButtonType}>
        {text}
      </button>
    </div>
  );
}
