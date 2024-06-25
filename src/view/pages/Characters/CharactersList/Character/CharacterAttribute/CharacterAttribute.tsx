import styles from './CharacterAttribute.module.css'

interface Props {
  className?: string
  children: string
  name: string
}

function CharacterAttribute({ name, children, className }: Props) {

  return (
    <section className={[styles.root, className].join(' ')}>
      <text className={styles.name}>{name}: </text>
      <text className={styles.value}>{children}</text>
    </section>
  )
}

export default CharacterAttribute
