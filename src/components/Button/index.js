import "./index.css";

export default function Button(props) {
  const { onClick, children = null } = props;

  return (
    <button className="add--button" onClick={onClick}>
      {children}
    </button>
  );
}
