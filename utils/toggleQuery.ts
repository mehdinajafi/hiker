const toggleQuery = (
  query: string | string[] | undefined,
  value: string
): string | string[] => {
  if (!query) {
    return value;
  } else {
    if (typeof query === "string" && query === value) {
      return [];
    }
    let values = Array.isArray(query) ? query : [query];
    const idIndex = values.findIndex((val) => val === String(value));

    if (idIndex > -1) {
      values.splice(idIndex, 1);
    } else {
      values.push(String(value));
    }

    return values;
  }
};

export default toggleQuery;
