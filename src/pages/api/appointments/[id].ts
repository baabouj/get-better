import type { NextApiRequest, NextApiResponse } from "next";

import httpStatus from "http-status";

import { prisma } from "lib/prisma";
import { auth, catchAsync } from "helpers";
import { ApiException } from "exceptions/ApiException";

export default catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE")
    throw new ApiException(httpStatus.METHOD_NOT_ALLOWED);

  const userId = auth(req);
  const { id }: any = req.query;

  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!appointment) throw new ApiException(httpStatus.NOT_FOUND);

  if (appointment.userId !== userId)
    throw new ApiException(httpStatus.FORBIDDEN);

  await prisma.appointment.delete({
    where: {
      id: appointment.id,
    },
  });

  res.status(httpStatus.NO_CONTENT).send(null);
});
