import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/auth/login.tsx"),
  // route("login", "routes/login.tsx"),
  route("setup", "routes/accountSetup.tsx"),
] satisfies RouteConfig;
