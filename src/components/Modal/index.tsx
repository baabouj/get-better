type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ visible = true, onClose, children }) => {
  return visible ? (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="flex items-center max-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-light rounded-md shadow-lg">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Modal;
