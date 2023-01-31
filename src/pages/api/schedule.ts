import type { NextApiRequest, NextApiResponse } from "next";

import httpStatus from "http-status";

import { prisma } from "$lib/prisma";
import { auth, catchAsync, validate } from "$helpers";
import { Appointment, scheduleAppontmentSchema } from "$utils/validation";
import { ApiException } from "$exceptions/ApiException";

export default catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    throw new ApiException(httpStatus.METHOD_NOT_ALLOWED);

  const userId = auth(req);

  const { data, errors } = validate<Appointment>(
    req.body,
    scheduleAppontmentSchema
  );

  if (errors)
    throw new ApiException(httpStatus.BAD_REQUEST, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Bad Request",
      error: errors[0],
    });

  const appointment = await prisma.appointment.create({
    data: {
      ...data,
      userId,
    },
  });

  res.status(httpStatus.CREATED).json(appointment);
});
