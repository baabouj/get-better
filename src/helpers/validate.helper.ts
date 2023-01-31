import { Schema } from "zod";

export const validate = <T>(data: T, schema: Schema) => {
  const result = schema.safeParse(data);

  if (result.success) return { data, errors: null };

  const errors = result.error.errors.map((err) => err.message);

  return {
    errors,
    data: null,
  };
};
