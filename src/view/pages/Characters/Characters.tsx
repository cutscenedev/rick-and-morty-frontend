import React from 'react'
import { observer } from 'mobx-react-lite'
import useDependency from '../../hooks/useDependency';

interface Props {

}

function Characters() {
  const { userStore } = useDependency();

  function handleLogoutClick() {
    userStore.logout();
  }

  return (
    <div>
      Characters
      <button onClick={handleLogoutClick}>logout</button>
    </div>
  )
};

export default observer(Characters);
