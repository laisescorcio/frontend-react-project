import styles from "./Input.module.scss";

interface InputProps {
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
}

export default function Input({
  label,
  type,
  error,
  placeholder,
  ...props
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
