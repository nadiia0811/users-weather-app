import { ReactNode } from "react"; 

interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({className, children, onClick}: ButtonProps) => {
  return (
    <button 
      className={className}
      onClick={onClick}>
        {children}
    </button>
  )
};

export default Button;
