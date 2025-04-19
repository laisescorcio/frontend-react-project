import styles from "./Button.module.scss";

type ButtonProps = {
  text?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
