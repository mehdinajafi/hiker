const getFirstString = (input: string | string[] | undefined) => {
  if (Array.isArray(input)) {
    return input.length > 0 ? input[0] : undefined;
  }
  return input;
};

export default getFirstString;
