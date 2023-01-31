import { FC } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

type Props = {
  service: string;
  description: string;
  Icon: (props: { className: string }) => JSX.Element;
};

const Card: FC<Props> = ({ service, description, Icon }) => {
  return (
    <div className="p-4 shadow rounded-3xl hover:bg-primary hover:cursor-pointer transition-all duration-500 group">
      <div className="flex items-center justify-center text-primary p-2 group-hover:text-light transition-all duration-500">
        <Icon className="text-6xl" />
        <h2 className="font-body font-semibold text-2xl px-2">{service}</h2>
      </div>
      <p className="font-body font-medium text-lg text-gray-500 p-2 group-hover:text-gray-200 transition-all duration-500">
        {description}
      </p>
      <div className="flex items-center text-primary group-hover:text-light transition-all duration-500">
        <p className="font-body font-medium text-lg p-2">Learn more</p>
        <IoArrowForwardOutline className="text-xl" />
      </div>
    </div>
  );
};

export default Card;
