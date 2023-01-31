import { z } from "zod";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);

import { hours } from "$constants/hours";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email("email must be a valid email address")
    .min(1, "email is required"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, "password must be more than 8 characters")
    .min(1, "password is required"),
});

const signupSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
    })
    .min(1, "name is required"),
  email: z
    .string({
      required_error: "email is required",
    })
    .email("email must be a valid email address")
    .min(1, "email is required"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, "password must be more than 8 characters")
    .min(1, "password is required"),
});

const scheduleAppontmentSchema = z
  .object({
    day: z
      .string()
      .transform((day) => dayjs(day))
      .refine((day) => {
        const weekDay = dayjs(day).day();
        const isWeekendDay = weekDay == 0 || weekDay == 6;
        return !isWeekendDay;
      }, "The appointment day must not be in the weekend")
      .refine(
        (day) => day.isSameOrAfter(dayjs(), "day"),
        "The appointment day must not be in the past"
      )
      .transform((day) => day.format("YYYY-MM-DD")),
    hour: z
      .string()
      .refine(
        (hour) => hours.includes(hour),
        "The appointment time must be a valid working hour"
      ),
  })
  .refine(
    ({ day, hour }) =>
      !(
        dayjs(day).isToday() &&
        Number(dayjs().format("HH")) > Number(hour.split(":")[0])
      ),
    "Please make sure the appointment day and time are valid"
  );

export type Login = z.infer<typeof loginSchema>;
export type Signup = z.infer<typeof signupSchema>;
export type Appointment = z.infer<typeof scheduleAppontmentSchema>;

export { loginSchema, signupSchema, scheduleAppontmentSchema };
