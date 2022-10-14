import "./Button.css";

const Button = ({ type, clicked, children }) => {
  return (
    <button
      onClick={clicked}
      className={type ? ["button", type].join(" ") : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
