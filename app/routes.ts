import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/auth/loginRoute.tsx"),
  // route("login", "routes/login.tsx"),
  route("setup", "routes/accountSetupRoute.tsx"),

  layout("routes/navigationBarLayout.tsx", [
    route("homepage", "routes/userpage/userProfilePage.tsx"),
  ]),
] satisfies RouteConfig;
