import React from "react";

type Props = {
  name: string;
  label: string;
  value?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const CheckField: React.FC<Props> = ({
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <fieldset className="flex gap-2 select-none" id={`fs-${name}`}>
      <input
        id={name}
        className="border-gray-300 bg-gray-100 rounded-none"
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
      <label htmlFor={name}>{label}</label>
    </fieldset>
  );
};
