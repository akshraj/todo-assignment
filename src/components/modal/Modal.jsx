import "./modal.scss";

export default function Modal({ children }) {
  return (
    <div
      className="darkBG"
    >
      <div className="centered">{children}</div>
    </div>
  );
}
