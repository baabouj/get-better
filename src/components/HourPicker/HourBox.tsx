import { FC } from "react";

type Props = {
  hour: string;
  onPick: (pickedHour: string) => void;
  isPicked: boolean;
  disabled: () => boolean;
};

const HourBox: FC<Props> = ({ hour, onPick, isPicked, disabled }) => {
  return (
    <button
      disabled={disabled()}
      onClick={() => onPick(hour)}
      className={`flex justify-end h-24 border-dark/30 border rounded transition-all ${
        isPicked && "bg-primary text-light"
      } disabled:border-red-600 disabled:text-red-600`}
    >
      <p className="text-lg font-body px-2">{hour}</p>
    </button>
  );
};
export default HourBox;
