import React from "react";

const Input = ({
  label,
  placeholder,
  name,
  type = "text",
  required = false,
  className = "mt-1",
  onChange = () => {},
  value,
  ...rest
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className={className}>
        <input
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          required={required}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 disabled:bg-gray-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {...rest}
        />
      </div>
    </>
  );
};

export default Input;
