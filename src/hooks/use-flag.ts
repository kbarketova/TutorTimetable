import React from 'react';

export const useFlag = (
  initialVal: boolean = false,
): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = React.useState(initialVal);
  return [
    value,
    () => setValue(true),
    () => setValue(false),
    () => setValue(!value),
  ];
};
