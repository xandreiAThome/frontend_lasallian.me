import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // route("login", "routes/login.tsx"),
  route("setup", "routes/accountSetupRoute.tsx"),

  route("logout", "routes/auth/logoutRoute.tsx"),

  route("about", "routes/aboutRoute.tsx"),

  // posts api
  route("createPost", "routes/api/posts/createPostRoute.tsx"),
  route("editPost", "routes/api/posts/editPostRoute.tsx"),
  route("deletePost", "routes/api/posts/deletePostRoute.tsx"),
  // comment api
  route("createComment", "routes/api/comments/createCommentRoute.tsx"),
  route("deleteComment", "routes/api/comments/deleteCommentRoute.tsx"),
  route("editComment", "routes/api/comments/editCommentRoute.tsx"),

  // reaction api
  // post
  route("sendReactionPost", "routes/api/reactions/post/sendReactionPost.tsx"),
  route(
    "deleteReactionPost",
    "routes/api/reactions/post/deleteReactionPost.tsx"
  ),
  //comment
  route(
    "sendReactionComment",
    "routes/api/reactions/comment/sendReactionComment.tsx"
  ),
  route(
    "deleteReactionComment",
    "routes/api/reactions/comment/deleteReactionComment.tsx"
  ),

  // other api
  route("editUserProfile", "routes/api/editUserProfileRoute.tsx"),
  
  layout("routes/auth/authLayout.tsx", [
    index("routes/auth/loginRoute.tsx"),
    route("register", "routes/auth/RegisterRoute.tsx"),
    route("verify", "routes/auth/verifyRoute.tsx"),
    route("forgotpassword", "routes/auth/forgotPasswordRoute.tsx"),
    route("resetpassword/:resetPasswordId", "routes/auth/resetPasswordRoute.tsx"),
  ]),

  layout("routes/navigationBarLayout.tsx", [
    route("homepage", "routes/homePageRoute.tsx"),
    route("userprofile/:userId", "routes/userpage/userProfileRoute.tsx"),
    route("todo", "routes/todo.tsx"),
    route("orgprofile", "routes/userpage/orgProfileRoute.tsx"),
    route("search", "routes/api/searchRoute.tsx"),
    route("hashtag/:hashtag", "routes/api/hashtagRoute.tsx"),
  ]),
] satisfies RouteConfig;
