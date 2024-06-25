import { ReactNode } from 'react'
import styles from './Character.module.css'
import CharacterAttribute from './CharacterAttribute/CharacterAttribute'
import CharacterButton from './CharacterButton/CharacterButton'
import CharacterLatestEpisodes from './CharacterLatestEpisodes/CharacterLatestEpisodes'
import CharacterImage from './CharacterImage/CharacterImage'
import CharacterFavorite from './CharacterFavorite/CharacterFavorite'

interface Props {
  className?: string
  children: ReactNode
}

function Character({ children, className }: Props) {
  return (
    <section className={[styles.root, className].join(' ')}>
      {children}
    </section>
  )
}

Character.Attribute = CharacterAttribute;
Character.Image = CharacterImage;
Character.Favorite = CharacterFavorite;
Character.Button = CharacterButton;
Character.LatestEpisodes = CharacterLatestEpisodes;

export default Character
