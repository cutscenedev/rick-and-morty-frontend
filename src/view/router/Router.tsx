import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react'

import Login from '../pages/Login/Login'
import Characters from '../pages/Characters/Characters'
import useDependency from '../hooks/useDependency'

export const ROUTES = {
  LOGIN: '/login',
  CHARACTERS: '/characters',
};

function Router() {
  const { userStore } = useDependency();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            userStore.loggedIn
              ? <Navigate replace to={ROUTES.CHARACTERS} />
              : <Login />
          }
        />
        <Route
          path={ROUTES.CHARACTERS}
          element={
            userStore.loggedIn
              ? <Characters />
              : <Navigate replace to={ROUTES.LOGIN} />
          }
        />
        <Route path="*" element={<Navigate replace to={ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default observer(Router)
