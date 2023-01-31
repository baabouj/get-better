import dayjs from "dayjs";
import { FC } from "react";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

type Props = {
  day: string;
  changeMonth: (type: "next" | "prev") => void;
};

const CalendarHeader: FC<Props> = ({ day, changeMonth }) => {
  const currentMonth = dayjs(day).format("MMMM YYYY");
  const weekdayshort = ["S", "M", "T", "W", "T", "F", "S"];
  let weekdayshortname = weekdayshort.map((name, idx) => {
    return (
      <div
        key={idx}
        className="flex flex-col justify-center items-center w-12 h-12 p-2 md:w-full md:h-full"
      >
        <h2 className="uppercase text-lg text-dark/80 font-body p-2 m-2 md:my-0">
          {name}
        </h2>
      </div>
    );
  });
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-evenly items-center bg-primary text-light rounded-full mx-4 py-2">
        <button onClick={() => changeMonth("prev")}>
          <IoChevronBack className="text-lg" />
        </button>
        <h2 className="uppercase text-center text-lg font-body">
          {currentMonth}
        </h2>
        <button onClick={() => changeMonth("next")}>
          <IoChevronForward className="text-lg" />
        </button>
      </div>
      <div className="flex justify-between md:items-center">
        {weekdayshortname}
      </div>
    </div>
  );
};

export default CalendarHeader;
