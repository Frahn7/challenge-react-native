export const helperDate = (input: string | number | Date) => {
  let d: Date | null = null;

  if (input instanceof Date) {
    d = input;
  } else if (typeof input === "number") {
    // unix seconds (10 díg.) o millis (13 díg.)
    d = new Date(input < 1e12 ? input * 1000 : input);
  } else if (typeof input === "string") {
    const s = input.trim();

    // 1) DD/MM/YYYY o DD/MM/YYYY HH:mm(:ss)? (con espacio o coma)
    const dmYTime =
      /^(\d{2})\/(\d{2})\/(\d{4})(?:[ ,]+(\d{2}):(\d{2})(?::(\d{2}))?)?$/;
    const m1 = s.match(dmYTime);
    if (m1) {
      const [, dd, mm, yyyy, HH = "00", MM = "00", SS = "00"] = m1;
      d = new Date(
        Number(yyyy),
        Number(mm) - 1,
        Number(dd),
        Number(HH),
        Number(MM),
        Number(SS)
      );
    }

    // 2) YYYY-MM-DD (con o sin hora/zonas) → usar Date directo
    if (!d && /^\d{4}-\d{2}-\d{2}/.test(s)) {
      // Si es solo fecha "YYYY-MM-DD", construyo local para evitar shift de TZ
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, day] = s.split("-");
        d = new Date(Number(y), Number(m) - 1, Number(day));
      } else {
        d = new Date(s); // ISO completo/UTC con Z, etc.
      }
    }

    // 3) "1759934930" → unix seconds como string
    if (!d && /^\d+$/.test(s)) {
      const n = parseInt(s, 10);
      d = new Date(n < 1e12 ? n * 1000 : n);
    }

    // 4) Último intento (por si viene un ISO válido)
    if (!d) d = new Date(s);
  }

  if (!d || isNaN(d.getTime())) return "";

  // Fecha + hora en es-AR
  return d.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const parseToDate = (input: string | number | Date): Date => {
  let d: Date | null = null;

  if (input instanceof Date) {
    d = input;
  } else if (typeof input === "number") {
    // Unix en segundos o milisegundos
    d = new Date(input < 1e12 ? input * 1000 : input);
  } else if (typeof input === "string") {
    const s = input.trim();

    // DD/MM/YYYY o DD/MM/YYYY HH:mm
    const dmYTime = /^(\d{2})\/(\d{2})\/(\d{4})(?:[ ,]+(\d{2}):(\d{2}))?$/;
    const m1 = s.match(dmYTime);
    if (m1) {
      const [, dd, mm, yyyy, HH = "00", MM = "00"] = m1;
      d = new Date(+yyyy, +mm - 1, +dd, +HH, +MM);
    }

    // YYYY-MM-DD o ISO
    if (!d && /^\d{4}-\d{2}-\d{2}/.test(s)) {
      d = new Date(s);
    }

    // "1759934990" como string numérica (unix seconds)
    if (!d && /^\d+$/.test(s)) {
      d = new Date(parseInt(s, 10) * 1000);
    }

    // último intento
    if (!d) d = new Date(s);
  }

  return d && !isNaN(d.getTime()) ? d : new Date();
};
