export const requiredColumnsVinculo = [
  "Disciplina (Código)",
  "Turma",
  "Matrícula",
  "Email",
  "professor",
];

export const validateVinculoAlunoCsv = (csvData) => {
  const csvColumns = csvData.meta.fields;
  const errors = [];

  const missingColumns = requiredColumnsVinculo.filter(
    (col) => !csvColumns.includes(col)
  );
  if (missingColumns.length) {
    return {
      isValid: false,
      error: `Colunas faltando: ${missingColumns.join(", ")}`,
    };
  }

  const validRows = csvData.data.filter((row, index) => {
    const values = Object.values(row).map(
      (value) => value?.toString().trim() || ""
    );
    const isRowEmpty = values.every((value) => value === "");

    if (isRowEmpty) {
      return false;
    }

    requiredColumnsVinculo.forEach((column) => {
      const value = row[column];
      if (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
      ) {
        errors.push(`Linha ${index + 2}: Campo "${column}" não preenchido.`);
      }
    });

    return true;
  });

  if (validRows.length === 0) {
    return { isValid: false, error: "Nenhuma linha válida encontrada." };
  }

  // Mapeia para o formato do backend
  const data = validRows.map((row) => ({
    subjectCode: row["Código da Disciplina"],
    classCode: row["Turma"],
    registrationNumber: row["Matrícula"],
    email: row["Email"],
    professor:
      row["professor"] === true ||
      row["professor"] === "true" ||
      row["professor"] === "1",
  }));

  return {
    isValid: errors.length === 0,
    data,
    warnings: errors,
  };
};
