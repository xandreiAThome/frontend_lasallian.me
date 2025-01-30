import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/auth/loginRoute.tsx"),
  // route("login", "routes/login.tsx"),
  route("setup", "routes/accountSetupRoute.tsx"),
  route("homepage", "routes/homepage/homepage.tsx")
] satisfies RouteConfig;
