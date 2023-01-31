import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

import { Calendar, HourPicker } from "$components";
import { Appointment, scheduleAppontmentSchema } from "$utils/validation";
import { validate } from "$helpers";
import { useAppointment } from "$hooks";
import { AxiosError } from "axios";

export default function Schedule() {
  const today = dayjs().format("YYYY-MM-DD");
  const [day, setDay] = useState(today);
  const [hour, setHour] = useState("");
  const [scheduledAppointments, setScheduledAppointments] = useState<string[]>(
    []
  );

  const { schedule, fetchAppointmentsByDay } = useAppointment();

  const router = useRouter();
  const notify = (error: string) => toast.error(error);
  const fetchScheduledAppointments = async () => {
    const data = await fetchAppointmentsByDay(day);
    setScheduledAppointments(
      data.map(
        (appointment: Appointment) => `${appointment.day} ${appointment.hour}`
      )
    );
  };

  useEffect(() => {
    fetchScheduledAppointments();
  }, [day]);

  const scheduleAppointment = async () => {
    const { data, errors } = validate<Appointment>(
      { day, hour },
      scheduleAppontmentSchema
    );

    if (errors) {
      notify(errors[0]);
      return;
    }

    try {
      await schedule(data);
      router.push("/appointments");
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        notify("Login to make appointments");
        return;
      }
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col mt-8">
      <h1 className="text-2xl text-dark font-body font-semibold capitalize text-center md:hidden mb-8">
        Make an appointment
      </h1>
      <div className="flex flex-col md:flex-row w-full">
        <Calendar
          selectedDay={day}
          onSelect={(day) => setDay(day)}
          minDay={today}
        />
        <div className="flex flex-col justify-between w-full my-4">
          <h1 className="text-2xl text-dark font-body font-semibold capitalize text-center md:block hidden">
            Make an appointment
          </h1>
          <HourPicker
            pickedHour={hour}
            onPick={(hour: string) => setHour(hour)}
            disabled={(hour: string) =>
              scheduledAppointments?.includes(`${day} ${hour}`)
            }
          />
          <button
            onClick={scheduleAppointment}
            className="self-center w-fit my-4 md:mt-0 rounded-lg font-body font-medium bg-primary text-gray-100 shadow py-4 px-6 capitalize"
          >
            schedule appointment
          </button>
          <Toaster
            toastOptions={{
              className: "font-body text-center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
