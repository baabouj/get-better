import { FC } from "react";

import { hours } from "$constants/hours";

import HourBox from "./HourBox";

type Props = {
  pickedHour: string;
  onPick: (pickedHour: string) => void;
  disabled: (time: string) => boolean;
};

const HourPicker: FC<Props> = ({ pickedHour, onPick, disabled }) => {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 place-content-center md:ml-8">
      {hours.map((hour) => (
        <HourBox
          key={hour}
          hour={hour}
          isPicked={pickedHour == hour}
          onPick={onPick}
          disabled={() => disabled(hour)}
        />
      ))}
    </div>
  );
};

export default HourPicker;
