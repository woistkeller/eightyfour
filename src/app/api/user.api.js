import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authUser.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "get",
        params: {
          username: credentials.username,
          password: credentials.password,
        },
      }),
    }),
  }),
});

export const { useAuthMutation } = userAPI;
