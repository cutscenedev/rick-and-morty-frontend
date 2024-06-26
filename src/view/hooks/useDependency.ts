import { useContext } from 'react'

import { dependencyContext } from '../contexts/dependecyContext'

function useDependency() {
  const dependency = useContext(dependencyContext)

  if (dependency === null) {
    throw new Error('Could not found dependency context')
  }

  return dependency
}

export default useDependency
