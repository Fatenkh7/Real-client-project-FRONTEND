import "./index.css";

export default function Button(props) {
  const { onClick, children } = props;

  return (
    <button className="add--button" onClick={onClick}>
      {children}
    </button>
  );
}
