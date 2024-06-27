import styles from './CharacterAttribute.module.css'

interface Props {
  className?: string
  children: string
  name: string
}

function CharacterAttribute({ name, children, className }: Props) {

  return (
    <section className={[styles.root, className].join(' ')}>
      <span className={styles.name}>{name}: </span>
      <span className={styles.value}>{children}</span>
    </section>
  )
}

export default CharacterAttribute
