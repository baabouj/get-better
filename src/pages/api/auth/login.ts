import type { NextApiRequest, NextApiResponse } from "next";

import httpStatus from "http-status";
import argon from "argon2";
import jwt from "jsonwebtoken";

import { prisma } from "$lib/prisma";
import { setTokenCookie } from "$lib/cookies";
import { catchAsync, validate } from "$helpers";
import { Login, loginSchema } from "$utils/validation";
import { ApiException } from "$exceptions/ApiException";

export default catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    throw new ApiException(httpStatus.METHOD_NOT_ALLOWED);

  const { data, errors } = validate<Login>(req.body, loginSchema);

  if (errors)
    throw new ApiException(httpStatus.BAD_REQUEST, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Bad Request",
      error: errors[0],
    });

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user)
    throw new ApiException(httpStatus.BAD_REQUEST, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Bad Request",
      error: "Invalid email or password",
    });

  const isMatched = await argon.verify(user.password, data.password);

  if (!isMatched)
    throw new ApiException(httpStatus.BAD_REQUEST, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Bad Request",
      error: "Invalid email or password",
    });

  const token = jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_SECRET!
  );

  setTokenCookie(res, token);

  res.status(httpStatus.OK).json({
    name: user.name,
  });
});
