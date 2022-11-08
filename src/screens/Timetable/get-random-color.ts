// return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();

export const getRandomColor = (): string => {
  const maxVal = 0xffffff;
  return (
    '#' +
    Math.floor(Math.random() * maxVal)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  );
};
