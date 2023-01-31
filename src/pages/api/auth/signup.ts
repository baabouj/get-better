import type { NextApiRequest, NextApiResponse } from "next";

import httpStatus from "http-status";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { prisma } from "$lib/prisma";
import { setTokenCookie } from "$lib/cookies";
import { catchAsync, validate } from "$helpers";
import { signupSchema, Signup } from "$utils/validation";
import { ApiException } from "$exceptions/ApiException";

export default catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    throw new ApiException(httpStatus.METHOD_NOT_ALLOWED);

  const { data, errors } = validate<Signup>(req.body, signupSchema);

  if (errors)
    throw new ApiException(httpStatus.BAD_REQUEST, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Bad Request",
      error: errors[0],
    });

  try {
    data.password = await argon.hash(data.password);

    const user = await prisma.user.create({
      data,
    });

    const token = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET!
    );

    setTokenCookie(res, token);

    res.status(httpStatus.CREATED).json({
      name: user.name,
    });
  } catch (error) {
    // Check if error is unique constraint error (email already exist)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new ApiException(httpStatus.BAD_REQUEST);
    }
    throw error;
  }
});
