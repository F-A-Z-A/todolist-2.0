import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import { Navigate } from "react-router-dom"
import { useLogin } from "features/auth/lib/hooks/useLogin"
import { LoginFormLabel } from "features/auth/ui/Login/LoginFormLabel/LoginFormLabel"
import { LoginForm } from "./LoginForm/LoginForm"

export const Login = () => {
  const { isLoggedIn } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
            <LoginForm />
          </FormLabel>
        </FormControl>
      </Grid>
    </Grid>
  )
}
