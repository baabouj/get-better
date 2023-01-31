import type { NextApiRequest, NextApiResponse } from "next";

import httpStatus from "http-status";
import argon from "argon2";
import jwt from "jsonwebtoken";

import { prisma } from "$lib/prisma";
import { removeTokenCookie, setTokenCookie } from "$lib/cookies";
import { auth, catchAsync } from "$helpers";
import { ApiException } from "$exceptions/ApiException";

export default catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    throw new ApiException(httpStatus.METHOD_NOT_ALLOWED);

  auth(req);

  removeTokenCookie(res);

  res.status(httpStatus.NO_CONTENT).send("");
});
