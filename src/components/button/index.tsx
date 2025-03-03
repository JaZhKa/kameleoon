import styles from './Button.module.css';

interface IButtonProps {
  children: React.ReactNode;
  callback: () => void;
}
const Button = ({ children, callback }: IButtonProps) => {
  return (
    <button
      className={
        styles[`action-button-${children}`]
      }
      onClick={callback}
    >
      {children}
    </button>
  );
};

export default Button;
