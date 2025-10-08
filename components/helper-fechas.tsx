export const helperDate = (input: string | number | Date) => {
  let d: Date | null = null;

  if (input instanceof Date) {
    d = input;
  } else if (typeof input === "number") {
    // Unix en segundos o milisegundos
    d = new Date(input < 1e12 ? input * 1000 : input);
  } else if (typeof input === "string") {
    const s = input.trim();

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
      // DD/MM/YYYY → construir en hora local (evita líos de zona)
      const [dd, mm, yyyy] = s.split("/");
      d = new Date(+yyyy, +mm - 1, +dd);
    } else if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
      // YYYY-MM-DD (o ISO) → también construir local
      const [y, m, day] = s.split("T")[0].split("-");
      d = new Date(+y, +m - 1, +day);
    } else if (/^\d+$/.test(s)) {
      // "1758834810" como string → unix segundos
      d = new Date(parseInt(s, 10) * 1000);
    } else {
      // último intento (ISO completa, etc.)
      d = new Date(s);
    }
  }

  if (!d || isNaN(d.getTime())) return ""; // si no se pudo parsear
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
