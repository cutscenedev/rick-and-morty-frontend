import { useMemo } from 'react';

import { Character } from '../../../../../../providers/characters/CharactersProvider'
import styles from './CharacterLatestEpisodes.module.css'

interface Props {
  className?: string
  episodes: Character['episode'];
}

function CharacterLatestEpisodes({ episodes, className }: Props) {
  const threeLatestEpisodes = useMemo(() => {
    const sortedEpisodes = episodes
      .sort((a, b) => new Date(b.air_date).getTime()
        - new Date(a.air_date).getTime());
    
    return sortedEpisodes.slice(0, 3);
  }, [episodes]);


  return (
    <div className={[styles.root, className].join(' ')}>
      {threeLatestEpisodes.map(episode => (
        <div className={styles.episode}>
          {episode.name} [{episode.air_date}]
        </div>
      ))}
    </div>
  )
}

export default CharacterLatestEpisodes
