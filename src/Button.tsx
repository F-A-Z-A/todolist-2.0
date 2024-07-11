export const Button = ({ title, onClick }: ButtonType) => {
  return <button onClick={onClick}>{title}</button>;
};

// types
type ButtonType = {
  title: string;
  onClick?: () => void;
};
