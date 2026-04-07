const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const baseStyles =
    "font-bold rounded-full inline-flex items-center justify-center";

  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    primary: "bg-primary-100 text-primary-700",
    success: "bg-emerald-100 text-emerald-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    discount: "bg-linear-to-r from-red-500 to-rose-500 text-white shadow-lg",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
