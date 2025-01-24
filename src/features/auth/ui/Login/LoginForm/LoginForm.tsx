import Button from "@mui/material/Button/Button"
import Checkbox from "@mui/material/Checkbox/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel"
import FormGroup from "@mui/material/FormGroup/FormGroup"
import TextField from "@mui/material/TextField/TextField"
import { useLogin } from "features/auth/lib/hooks/useLogin"
import s from "../Login.module.css"
import { Controller } from "react-hook-form"

export const LoginForm = () => {
  const { onSubmit, handleSubmit, errors, register, control } = useLogin()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <TextField
          label="Email"
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Incorrect email address",
            },
          })}
        />
        {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
        <TextField
          type="password"
          label="Password"
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters long",
            },
          })}
        />
        {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

        <FormControlLabel
          label={"Remember me"}
          control={
            <Controller
              name={"rememberMe"}
              control={control}
              render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
            />
          }
        />
        <Button type={"submit"} variant={"contained"} color={"primary"}>
          Login
        </Button>
      </FormGroup>
    </form>
  )
}
