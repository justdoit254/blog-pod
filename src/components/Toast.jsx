const toastSyles = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
};

const Toast = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 ${toastSyles[type]} px-6 py-2 rounded shadow-lg transform -translate-x-1/2 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
    >
      {message}
    </div>
  );
};

export default Toast;
