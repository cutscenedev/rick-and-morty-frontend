import styles from './CharacterImage.module.css'

interface Props {
  className?: string
  src: string;
  size?: number
}

function CharacterImage({ src, size, className }: Props) {

  return (
    <img
      src={src}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={[styles.root, className].join(' ')}
    />
  )
}

export default CharacterImage
