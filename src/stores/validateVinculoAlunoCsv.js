export const requiredColumnsVinculo = [
  "Código da Disciplina",
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
      if (!value || value.toString().trim() === "") {
        errors.push(`Linha ${index + 2}: Campo "${column}" não preenchido.`);
      }
    });

    return true;
  });

  if (validRows.length === 0) {
    return { isValid: false, error: "Nenhuma linha válida encontrada." };
  }

  return {
    isValid: true,
    data: validRows,
    warnings: errors,
  };
};
