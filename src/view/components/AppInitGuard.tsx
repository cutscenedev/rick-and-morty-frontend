import React from 'react'
import { observer } from "mobx-react"

import useDependency from '../hooks/useDependency'

interface Props {
  children: React.ReactNode
}

function AppInitGuard({ children }: Props) {
  const { appStore } = useDependency();

  return (
    <>
      {appStore.appInitialized
        ? children
        : 'App is loading...'
      }
    </>
  );
}

export default observer(AppInitGuard)
