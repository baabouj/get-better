import type { NextApiRequest, NextApiResponse } from "next";

import httpStatus from "http-status";

import { prisma } from "$lib/prisma";
import { auth, catchAsync } from "$helpers";
import { ApiException } from "$exceptions/ApiException";

export default catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method !== "GET")
    throw new ApiException(httpStatus.METHOD_NOT_ALLOWED);

  const { day } = req.query;

  if (day) {
    const appointment = await prisma.appointment.findMany({
      where: {
        day: day as string,
      },
    });

    return res.status(httpStatus.OK).json(appointment);
  }

  const userId = auth(req);
  const appointment = await prisma.appointment.findMany({
    where: {
      userId,
    },
  });

  res.status(httpStatus.OK).json(appointment);
});
