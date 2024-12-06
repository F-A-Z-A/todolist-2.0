import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "api-key": process.env.REACT_APP_API_KEY,
  },
});

// export const instance = axios.create({
//   baseURL: "https://social-network.samuraijs.com/api/1.1/",
//   headers: {
//     Authorization: "Bearer d9ccb405-7d87-4d35-96c7-e194c6ad9a3b",
//     "api-key": "438bbb86-9698-4d5c-8bdf-946e37572d76",
//   },
// });
