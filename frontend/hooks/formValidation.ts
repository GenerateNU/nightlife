import { useState } from "react";

const useFormValidation = (email: string, password: string) => {
  const [errors, setErrors] = useState<{ message: string | null }>({
    message: null,
  });

  const validate = (): boolean => {
    const validationErrors: { message: string | null } = { message: null };
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      validationErrors.message = "Invalid email address.";
      isValid = false;
    }

    if (!password) {
      validationErrors.message = "A password is required.";
      isValid = false;
    } else if (password.length < 6) {
      validationErrors.message = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  return { errors, validate };
};

export default useFormValidation;
