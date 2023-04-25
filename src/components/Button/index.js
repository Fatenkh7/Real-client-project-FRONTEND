import "./index.css";

export default function Button(props) {
  const { onClick, children } = props;

  return (
    <div className="button-container">
      <button onClick={onClick}>{children}</button>
    </div>
  );
}
