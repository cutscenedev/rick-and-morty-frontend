import styles from './Button.module.css'

interface Props {
  className?: string
  children: string
  secondary?: boolean
  onClick(): void
}

function Button({ children, onClick, className, secondary }: Props) {

  function handleButtonClick() {
    onClick();
  };

  return (
    <button
      className={[
        styles.root,
        className,
        secondary ? styles.secondary : styles.primary,
      ].join(' ')}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  )
}

export default Button
