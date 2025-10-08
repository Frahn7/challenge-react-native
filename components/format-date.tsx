export const FormatDate = (d?: Date) => {
  return d?.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
