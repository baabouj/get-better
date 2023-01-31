import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

import { validate } from "$helpers";
import { Login, loginSchema } from "$utils/validation";
import { useAuth } from "$hooks";

import { AuthModalsProps } from "./auth-modals-props.type";
import Input from "../Input";

const LoginForm: React.FC<AuthModalsProps> = ({ onClose, onLinkClicked }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = validate<Login>({ email, password }, loginSchema);

    setError("");
    if (!data) {
      setError(errors[0]);

      return;
    }

    try {
      await login(data);
      onClose();
    } catch (error) {
      setError("invalid email or password");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center relative p-8 pt-0"
    >
      <div className="flex justify-center items-center self-start">
        <div className="hover:cursor-pointer">
          <IoArrowBackOutline className="w-8 h-8 mr-4" onClick={onClose} />
        </div>
        <h1 className="text-4xl font-body font-bold self-start py-8">Log in</h1>
      </div>
      <p className="font-medium pb-4 self-start text-xl font-body text-secondary/60">
        Welcome to
        <span className="text-primary"> GetBetter</span>
      </p>
      <div className="flex flex-col z-10">
        <Input
          placeholder="Enter email address"
          type="email"
          onChange={({ target: { value } }) => setEmail(value)}
          error={error}
        />
        <Input
          placeholder="Enter password"
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          error={error}
        />
        <button
          type="submit"
          className="font-medium font-body text-light bg-primary my-4 py-3 px-5 rounded-full"
        >
          Continue
        </button>
        <p className="font-medium text-lg font-body text-dark/80 m-4 text-center">
          Don&apos;t have an account?
          <span
            className="text-primary hover:cursor-pointer mx-1"
            onClick={onLinkClicked}
          >
            Sign Up
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
