export const checkValidData = (
  email,
  password,
  name = "",
  isSignUp = false
) => {
  const Email = (email || "").trim();
  const Password = (password || "").trim();
  const Name = (name || "").trim();

  // Name validation only for sign up
  if (isSignUp) {
    if (!Name) return "Name is required for sign up";
    if (Name.length < 2) return "Name must be at least 2 characters";
    if (Name.length > 30) return "Name must be 30 characters or less";
    if (!/^[A-Za-z\s'-]+$/.test(Name))
      return "Name contains invalid characters";
  }

  const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    Email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      Password
    );

  if (!isEmail) return "Email is not valid";
  if (!isPasswordValid)
    return "Password is not valid (min 8 chars, include upper, lower, number and special char)";

  return null;
};
