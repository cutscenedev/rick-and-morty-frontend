import Button from '../../../../../components/library/Button/Button'
import styles from './CharacterButton.module.css'

interface Props {
  className?: string
  children: string
  onClick(): void
  secondary: boolean
}

function CharacterButton({ onClick, secondary, children, className }: Props) {

  return (
    <Button
      secondary={secondary}
      onClick={onClick}
      className={[styles.root, className].join(' ')}
    >
      {children}
    </Button>
  )
}

export default CharacterButton
