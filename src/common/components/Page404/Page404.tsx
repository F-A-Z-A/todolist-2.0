import s from "./Page404.module.css"
import { MenuButton } from "common/components"
import React, { useEffect } from "react"
import Toolbar from "@mui/material/Toolbar"
import { Path } from "common/routing/Routing"
import { useNavigate } from "react-router"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"

export const Page404 = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const goToMainHandler = () => {
    navigate(Path.Main)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <MenuButton onClick={goToMainHandler}>Go to Main</MenuButton>
      </Toolbar>
    </>
  )
}
