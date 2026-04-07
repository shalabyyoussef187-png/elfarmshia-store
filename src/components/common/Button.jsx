const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  icon,
}) => {
  const baseStyles =
    "font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-linear-to-r from-primary-500 to-teal-500 text-white hover:from-primary-600 hover:to-teal-600 shadow-lg hover:shadow-xl",
    secondary:
      "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300",
    outline:
      "bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
