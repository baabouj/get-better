import { useState } from "react";

import Modal from "../Modal";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = ({
  openedModal = null,
  open,
  close,
}: {
  openedModal: "login" | "signup" | null;
  open: (modal: "login" | "signup") => void;
  close: () => void;
}) => {
  // const [openedForm, setOpenedForm] = useState(openedModal);

  return (
    <Modal visible={!!openedModal} onClose={close}>
      {openedModal === "login" && (
        <LoginForm onClose={close} onLinkClicked={() => open("signup")} />
      )}
      {openedModal === "signup" && (
        <SignupForm onClose={close} onLinkClicked={() => open("login")} />
      )}
    </Modal>
  );
};

export default AuthModal;
