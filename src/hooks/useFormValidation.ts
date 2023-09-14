import { ValidationRules } from "@listed-types";
import { useState } from "react";

export const useFormValidation = (
  initialFormData: Record<string, any>,
  validationRules: ValidationRules
) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    for (const field in validationRules) {
      const rule = validationRules[field];
      if (rule.required && formData[field] === "") {
        newErrors[field] = `Please enter ${field}.`;
      } else if (rule.custom && !rule.custom(formData[field])) {
        newErrors[field] = rule.customErrorMessage!;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (value: any, field: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return { formData, errors, validate, handleInputChange };
};
