import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { authApi } from "../api/authAPI"
import { LoginArgs } from "../api/authAPI.types"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { setAppStatus } from "app/appSlice"
import { clearTasksAndTodolistsData } from "common/actions/commonActions"

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

export const authSlice = createSliceWithThunks({
  name: "auth",

  initialState: {
    isLoggedIn: false as boolean,
    isInitialized: false as boolean,
  },

  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },

  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      initializeApp: createAThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authApi.me()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
          settled: (state) => {
            state.isInitialized = true
          },
        },
      ),

      login: createAThunk(
        async (data: LoginArgs, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authApi.login(data)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              localStorage.setItem("sn-token", res.data.data.token)
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),

      logout: createAThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authApi.logout()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              localStorage.removeItem("sn-token")
              dispatch(clearTasksAndTodolistsData({ tasks: {}, todolists: [] }))
              return { isLoggedIn: false }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
    }
  },

  // _reducers: (create) => ({
  //   setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
  //     state.isLoggedIn = action.payload.isLoggedIn
  //   }),
  //   setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
  //     state.isInitialized = action.payload.isInitialized
  //   }),
  // }),
})

export const authReducer = authSlice.reducer
export const { initializeApp, login, logout } = authSlice.actions
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
