import { useEffect, useState } from "react";
import { NextPage } from "next";

import { useAppointment, useAuth, useUser } from "$hooks";
import { Appointment } from "@prisma/client";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Link from "next/link";

const Appointments: NextPage = () => {
  const [user] = useUser();
  const auth = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { fetchAppointments, deleteAppointment } = useAppointment();

  useEffect(() => {
    if (user.isLoggedIn) {
      (async () => {
        const data = await fetchAppointments();
        setAppointments(data);
      })();
    }
  }, [fetchAppointments, user.isLoggedIn]);

  const cancelAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-dark text-center md:text-left font-body font-semibold py-8">
        My Appointments
      </h1>
      <div className="md:min-h-[50vh]">
        {!user.isLoggedIn ? (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <p className="flex items-center text-lg font-body">
              Log in to see your appointments
            </p>

            <button
              onClick={() => auth.open("login")}
              className="self-center w-fit my-4 rounded-lg font-body font-medium bg-primary text-gray-100 shadow py-4 px-6 capitalize"
            >
              Log in
            </button>
          </div>
        ) : appointments?.length !== 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {appointments.map(({ id, day, hour }) => (
              <div
                key={id}
                className="flex justify-evenly items-center h-fit border border-primary shadow rounded p-2"
              >
                <div className="flex items-center text-lg font-body">
                  <IoCalendarOutline className="text-xl text-primary" />
                  <p className="px-2">{day}</p>
                </div>
                <div className="flex items-center text-lg font-body">
                  <IoTimeOutline className="text-xl text-primary" />
                  <p className="px-2">{hour}</p>
                </div>
                <button
                  onClick={() => cancelAppointment(id)}
                  className="flex items-center text-lg font-body"
                >
                  <IoTrashOutline className="text-xl text-red-600" />
                  <p className="px-2">Cancel</p>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <p className="flex items-center text-lg font-body">
              You don&apos;t have any appointments
            </p>

            <button className="self-center w-fit my-4 rounded-lg font-body font-medium bg-primary text-gray-100 shadow py-4 px-6 capitalize">
              <Link href="/schedule">make appointment</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
