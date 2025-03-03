const capitalizeString = (str: string) => {
  if(str.length <= 3) return str;
  str = str.toLowerCase().replace(/_/g, '-');
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalizeString;
