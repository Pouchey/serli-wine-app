import './style.css';
type Props = {
  label?: string;
  size?: number;
};

export default ({ label, size = 50 }: Props) => {
  return (
    <div className="loader-wrapper">
      <span
        style={{
          width: size,
          height: size,
        }}
        className="loader"
      ></span>
      {label && <p>{label}</p>}
    </div>
  );
};
