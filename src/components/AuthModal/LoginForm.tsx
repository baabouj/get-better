import { useState } from "react";

import Input from "../Input";

// import { useUser } from "../hooks/useUser";

import { IoArrowBackOutline } from "react-icons/io5";
import { AuthModalsProps } from "./auth-modals-props.type";
import { validate } from "helpers";
import { Login, loginSchema } from "utils/validation";
import { useAuth } from "hooks";

const LoginForm: React.FC<AuthModalsProps> = ({ onClose, onLinkClicked }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "" });

  //   const [_, setUser] = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = validate<Login>({ email, password }, loginSchema);

    setPasswordError("");
    setEmailError("");
    if (!data) {
      errors.email && setEmailError(errors.email);
      errors.password && setPasswordError(errors.password);

      return;
    }

    try {
      await login(data);
      onClose();
    } catch (error) {
      console.log("OH NOO!");
      setPasswordError("invalid email or password");
      setEmailError("invalid email or password");
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
          error={emailError}
        />
        <Input
          placeholder="Enter password"
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          error={passwordError}
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
