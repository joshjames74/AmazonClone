import { handleCallback, handleLogin, handleLogout, handleProfile } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import { url } from "../../api/routes";

export async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //   await handleLogin(req, res, { redirectTo: "/" });
    // } catch (error) {
    //     res.status(error.status || 500).end(error.message);
    // }
    await handleLogin(req, res);
    
}

export async function callbackHandler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //   await handleCallback(req, res, { returnTo: '/' });
    // } catch (error) {
    //   res.status(error.status || 500).end(error.message);
    // }
    await handleCallback(req, res, { redirectUri : url.host });
  }

export async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //     await handleLogout(req, res, { returnTo: '/' });
    // } catch (error) {
    //     res.status(error.status || 500).end(error.message);
    // }
    await handleLogout(req, res, { returnTo: "/" });
}

export async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleProfile(req, res, { refetch: false });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}