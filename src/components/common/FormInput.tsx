import React from "react";

interface FormInputProps {
  id: string;
  type: string;
  label: string;
  register: any;
  errorMessage?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  label,
  register,
  errorMessage,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
    />
    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
  </div>
);

export default FormInput;
