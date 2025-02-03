import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // route("login", "routes/login.tsx"),
  route("setup", "routes/accountSetupRoute.tsx"),

  layout("routes/auth/authLayout.tsx", [
    index("routes/auth/loginRoute.tsx"),
    route("register", "routes/auth/RegisterRoute.tsx"),
    route("verify", "routes/auth/verifyRoute.tsx"),
  ]),

  layout("routes/navigationBarLayout.tsx", [
    route("homepage", "routes/homepage/feed.tsx"),
    route("userprofile", "routes/userpage/userProfilePage.tsx"),
    route("todo", "routes/todo.tsx"),
    route("orgprofile", "routes/userpage/orgProfilePage.tsx"),
  ]),
] satisfies RouteConfig;
