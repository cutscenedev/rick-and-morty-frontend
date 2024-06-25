import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import useDependency from '../../hooks/useDependency'
import { useNavigate } from 'react-router';
import { ROUTES } from '../../router/Router';

function Login() {
  const { userStore } = useDependency();
  const navigate = useNavigate();

  const [username, serUsername] = useState('');

  function handleUsernameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    serUsername(e.currentTarget.value);
  }

  async function handleLoginClick() {
    try {
      await userStore.login(username);

      navigate(ROUTES.CHARACTERS);
    } catch(err) {
      alert('request failed')
    }
  }

  return (
    <div className="root">
      <div className="input-title">Username</div>
      <input value={username} onChange={handleUsernameInputChange}></input>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  )
}

export default observer(Login)
