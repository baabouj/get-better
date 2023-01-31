import { useCallback } from "react";

import axios from "$lib/axios";
import { Appointment } from "$utils/validation";

export const useAppointment = () => {
  const schedule = useCallback(async (appointment: Appointment) => {
    await axios.post("/api/schedule", appointment);
  }, []);

  const fetchAppointments = useCallback(async () => {
    const { data } = await axios.get("/api/appointments");

    return data;
  }, []);

  const fetchAppointmentsByDay = useCallback(async (day: string) => {
    const { data } = await axios.get(`/api/appointments?day=${day}`);

    return data;
  }, []);

  const deleteAppointment = useCallback(async (id: string) => {
    await axios.delete(`/api/appointments/${id}`);
  }, []);

  return {
    schedule,
    fetchAppointments,
    fetchAppointmentsByDay,
    deleteAppointment,
  };
};
