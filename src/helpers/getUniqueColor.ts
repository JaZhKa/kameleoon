const getUniqueColor = (id: number) => {
  const hash = (id * 131) % 360;
  return `hsl(${hash}, 100%, 50%)`;
};

export default getUniqueColor;
