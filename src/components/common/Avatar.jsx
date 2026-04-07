const Avatar = ({ user, size = "md" }) => {
  // Get the first letter of name or email
  const getInitial = () => {
    if (user?.name && user.name.trim()) {
      return user.name.trim()[0].toUpperCase();
    }
    if (user?.email && user.email.trim()) {
      return user.email.trim()[0].toUpperCase();
    }
    return "U";
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-2xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white font-bold flex items-center justify-center shadow-lg ring-2 ring-teal-100 hover:ring-teal-200 transition-all duration-200`}
      title={user?.email || "User"}
    >
      {getInitial()}
    </div>
  );
};

export default Avatar;
