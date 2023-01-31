import { NextApiRequest } from "next";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import { ApiException } from "$exceptions/ApiException";
import { getTokenCookie } from "$lib/cookies";

export const auth = (req: NextApiRequest) => {
  const token = getTokenCookie(req);
  if (!token) throw new ApiException(httpStatus.UNAUTHORIZED);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    return payload.sub as string;
  } catch {
    // Invalid token
    throw new ApiException(httpStatus.UNAUTHORIZED);
  }
};
