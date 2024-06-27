import { useState } from 'react'
import { observer } from 'mobx-react'

import styles from './Login.module.css'

import useDependency from '../../hooks/useDependency'
import { useNavigate } from 'react-router';
import { ROUTES } from '../../router/Router';

import Input from '../../components/library/Input/Input';
import Button from '../../components/library/Button/Button';

function Login() {
  const { userStore } = useDependency();
  const navigate = useNavigate();

  const [username, serUsername] = useState('');

  async function login() {
    if (username.length < 3) {
      alert('Username length should be at least 3 symbols');

      return;
    }

    try {
      await userStore.login(username);

      navigate(ROUTES.CHARACTERS);
    } catch(err) {
      alert('request failed')
    }
  }

  return (
    <main className={styles.root}>
      <h2>Login</h2>
      <h4>Enter your username:</h4>
      <Input
        className={styles.loginInput}
        value={username}
        onChange={serUsername}
        onEnter={login}
      />

      <Button onClick={login}>
        Enter
      </Button>
    </main>
  )
}

export default observer(Login)
