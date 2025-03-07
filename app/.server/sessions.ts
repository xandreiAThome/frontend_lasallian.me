import {
  createCookieSessionStorage,
  redirect,
  type Session,
} from "react-router";
import type { authorInterface } from "~/lib/interfaces";

/** Represents a user in the system */
type User = {
  user: authorInterface;
  userToken: string;
};

const USER_SESSION_KEY = "userToken";

/**
 * Creates a cookie-based session storage.
 * @see https://reactrouter.com/en/dev/utils/create-cookie-session-storage
 */

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["s3cret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
  },
});

export const { commitSession, destroySession } = sessionStorage;

/**
 * Retrieves the user session from the request.
 * @param {Request} request - The incoming request.
 * @returns {Promise<Session>} The user session.
 */
const getUserSession = async (request: Request): Promise<Session> => {
  return await sessionStorage.getSession(request.headers.get("Cookie"));
};

/**
 * Logs out the user by destroying their session.
 * @param {Request} request - The incoming request.
 * @returns {Promise<Response>} Redirect response after logout.
 */
export async function logout(request: Request): Promise<Response> {
  console.log("logout");
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

/**
 * Retrieves the user id from the session.
 * @param {Request} request - The incoming request.
 * @returns {Promise<string | undefined>} The user ID if found, undefined otherwise.
 */
export async function getUserToken(
  request: Request
): Promise<User["userToken"] | undefined> {
  const session = await getUserSession(request);
  const userToken = session.get(USER_SESSION_KEY);
  return userToken;
}

export async function getUserId(
  request: Request
): Promise<User["user"]["_id"] | undefined> {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  return userId;
}

export async function getUserObject(
  request: Request
): Promise<User["user"] | undefined> {
  const session = await getUserSession(request);
  const userId = session.get("user");
  return userId;
}

/**
 * Creates a new user session.
 * @param {Object} params - The parameters for creating the session.
 * @param {Request} params.request - The incoming request.
 * @param {string} params.userId - The user ID to store in the session.
 * @param {boolean} params.remember - Whether to create a persistent session.
 * @param {string} [params.redirectUrl] - The URL to redirect to after creating the session.
 * @returns {Promise<Response>} Redirect response with the new session cookie.
 */
export async function createUserSession({
  request,
  userId,
  userToken,
  user,
  remember = true,
  redirectUrl,
}: {
  request: Request;
  userId: string;
  userToken: string;
  user: authorInterface;
  remember: boolean;
  redirectUrl?: string;
}): Promise<Response> {
  const session = await getUserSession(request);
  session.set(USER_SESSION_KEY, userToken);
  session.set("userId", userId);
  session.set("user", user);
  return redirect(redirectUrl || "/homepage", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: remember
          ? 60 * 60 // 1 hour
          : undefined,
      }),
    },
  });
}
