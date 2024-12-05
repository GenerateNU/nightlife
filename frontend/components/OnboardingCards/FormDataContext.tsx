import React, { createContext, useContext, ReactNode, useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  username?: string;
  pronouns?: string;
  bio?: string;
  nightlife?: string;
  interests?: string[];
  crowdPreference?: string[];
  timePreference?: string;
  location?: string;
  frequency?: string;
  insideOrOutside?: string;
}

interface ContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

const FormDataContext = createContext<ContextType | undefined>(undefined);

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = (): ContextType => {
  const context = useContext(FormDataContext);
  if (!context)
    throw new Error("useFormData must be used within a FormDataProvider");
  return context;
};
