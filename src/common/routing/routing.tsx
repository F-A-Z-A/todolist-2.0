import { Navigate, Route, Routes } from "react-router"
import { Main } from "app/Main"
import { Login } from "features/auth/ui/Login/Login"
import { Page404 } from "common/components/Page404/Page404"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "/404",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
      <Route path={"/*"} element={<Navigate to={"/404"} />} />
    </Routes>
  )
}
