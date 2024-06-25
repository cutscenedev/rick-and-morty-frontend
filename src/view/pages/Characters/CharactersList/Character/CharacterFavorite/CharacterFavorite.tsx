import styles from './CharacterFavorite.module.css'

interface Props {
  className?: string
  selected: boolean
  size?: number
  onClick(): void
}

const GRAY_STAR_EMOJI = '★';
const GOLD_STAR_EMOJI = '⭐';

function CharacterFavorite({ selected, className, onClick, size = 32 }: Props) {

  return (
    <div
      className={[styles.root, className].join(' ')}
      style={{ fontSize: `${size}px` }}
      onClick={onClick}
    >
      {selected ? GOLD_STAR_EMOJI: GRAY_STAR_EMOJI}
    </div>
  )
}

export default CharacterFavorite
