export const timeChange = (time: string | undefined) => {
  const date = new Date(time || "");
  return date.toLocaleDateString();
};
