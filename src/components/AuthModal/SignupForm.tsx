import { useState } from "react";

import Input from "../Input";

import { IoArrowBackOutline } from "react-icons/io5";

import { AuthModalsProps } from "./auth-modals-props.type";
import { useAuth } from "$hooks";
import { validate } from "$helpers";
import { Signup, signupSchema } from "$utils/validation";

const SignupForm: React.FC<AuthModalsProps> = ({ onClose, onLinkClicked }) => {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = validate<Signup>(
      { name, email, password },
      signupSchema
    );

    setError("");
    if (!data) {
      setError(errors[0]);

      return;
    }

    try {
      await signup(data);
      onClose();
    } catch (error) {
      console.log(error);
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
        <h1 className="text-4xl font-body font-bold self-start py-8">
          Sign Up
        </h1>
      </div>
      <p className="font-medium pb-4 self-start text-xl font-body text-secondary/60">
        Welcome to
        <span className="text-primary"> GetBetter</span>
      </p>
      <div className="flex flex-col z-10">
        <Input
          placeholder="Enter full name"
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          error={error}
        />
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
          Already have an account?
          <span
            className="text-primary hover:cursor-pointer mx-1"
            onClick={onLinkClicked}
          >
            Log in
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
