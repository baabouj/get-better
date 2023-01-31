import { useState, useEffect } from "react";

import CalendarHeader from "./CalendarHeader";

import dayjs from "dayjs";
import { getDaysOfMonth } from "$helpers/get-days-of-month.helper";

type Props = {
  onSelect: (selectedDay: string) => void;
  selectedDay: string;
  minDay: string;
};

const Calendar: React.FC<Props> = ({ onSelect, selectedDay, minDay }) => {
  const [data, setData] = useState<string[][]>([]);
  const [dayOfMonth, setDayOfMonth] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    setData(getDaysOfMonth(dayjs(dayOfMonth)));
  }, [dayOfMonth]);

  const changeMonth = (type: "next" | "prev") => {
    if (type == "next") {
      const day = dayjs(dayOfMonth).add(1, "M");
      setData(getDaysOfMonth(day));
      setDayOfMonth(day.format("YYYY-MM-DD"));
    } else {
      const day = dayjs(dayOfMonth).subtract(1, "M");
      setData(getDaysOfMonth(day));
      setDayOfMonth(day.format("YYYY-MM-DD"));
    }
  };

  const Week = ({ week }: { week: string[] }) => {
    return (
      <div className="grid grid-cols-7">
        {week?.map((day, i) => {
          const dayNumber = dayjs(day).format("DD");
          const isToday = day == dayjs().format("YYYY-MM-DD");

          const isWeekend =
            dayjs(day).format("ddd") == "Sat" ||
            dayjs(day).format("ddd") == "Sun";

          const isSelected = day == selectedDay;
          return (
            <button
              disabled={day < dayjs(minDay).format("YYYY-MM-DD") || isWeekend}
              className={`flex items-center justify-center w-12 h-12 border ${
                isToday ? "border-primary border-dashed" : " border-transparent"
              } hover:border-primary m-2 rounded-full transition ${
                isSelected && "bg-primary text-light"
              } disabled:opacity-50`}
              key={`${day}-${i}`}
              onClick={() => onSelect(day)}
            >
              <h1
                className={`text-lg font-body p-2 m-2 ${
                  isWeekend && "text-red-600"
                }`}
              >
                {dayNumber}
              </h1>
            </button>
          );
        })}
      </div>
    );
  };

  const renderWeeks = () =>
    data.map((week, idx) => <Week week={week} key={idx} />);

  if (!data.length) return null;

  return (
    <div className="flex flex-col">
      <CalendarHeader day={dayOfMonth} changeMonth={changeMonth} />
      {renderWeeks()}
    </div>
  );
};

export default Calendar;
