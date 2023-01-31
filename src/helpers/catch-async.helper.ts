import { NextApiRequest, NextApiResponse } from "next";

import { ApiException } from "$exceptions/ApiException";

import httpStatus from "http-status";

export const catchAsync = (
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return Promise.resolve(fn(req, res))
      .catch((err) => {
        if (!(err instanceof ApiException)) {
          console.error(err);
          err = new ApiException(httpStatus.INTERNAL_SERVER_ERROR);
        }

        throw err;
      })
      .catch((err: ApiException) =>
        res.status(err.statusCode).send(err.getResponse())
      );
  };
};
