import React from "react";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  helper?: React.ReactNode;
  number?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const TextField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  value,
  helper,
  number,
  onChange,
}) => {
  return (
    <fieldset className="flex flex-col gap-3" id={`fs-${name}`}>
      <>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          className="border bg-white h-9 flex items-center px-2 focus:border-blue-500 focus:outline-none"
          type={number ? 'number' : 'text'}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <p className="text-sm text-gray-500">{helper}</p>
      </>
    </fieldset>
  );
};
