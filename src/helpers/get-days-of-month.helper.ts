import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

export const getDaysOfMonth = (dayOfMonth = dayjs()) => {
  const startDay = dayjs(dayOfMonth).startOf("month");
  const daysInMonth = dayjs(dayOfMonth).daysInMonth();

  let daysOfMonth = Array.from({ length: daysInMonth }).map((_, index) => {
    return dayjs(startDay).add(index, "day");
  });

  const weeks: number[] = [];
  daysOfMonth.forEach((it) => {
    if (!weeks.includes(it.week())) {
      weeks.push(it.week());
    }
  });
  const days: string[][] = [];
  weeks.forEach((week) => {
    const firstWeekDay = dayjs(startDay).week(week).day(0);
    days.push(
      Array.from({ length: 7 }).map((_, index) =>
        dayjs(firstWeekDay).add(index, "day").format("YYYY-MM-DD")
      )
    );
  });

  return days;
};
