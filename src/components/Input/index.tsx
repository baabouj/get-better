type Props = {
  error: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = ({ error, ...props }) => {
  return (
    <div className="my-2">
      <input
        className="bg-light caret-primary w-full text-lg font-medium font-body shadow rounded-full my-2 py-3 px-5 outline-none border-2 border-gray-400 focus:border-primary"
        {...props}
      />
      <p className="pl-5 first-letter:uppercase font-body text-red-600">
        {error}
      </p>
    </div>
  );
};
export default Input;
