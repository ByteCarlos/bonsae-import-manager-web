export const requiredColumnsDisciplina = [
  'Período Letivo (Identificação)', 
  'Disciplina', 
  'Código da Disciplina*', 
  'Data Inicial', 
  'Data Final', 
  'Categoria', 
  'Período Curricular', 
  'Estado', 
  'Campus'
];

export const validateDisciplinaCsv = (csvData) => {
  const csvColumns = csvData.meta.fields;
  const errors = [];

  const missingColumns = requiredColumnsDisciplina.filter(col => !csvColumns.includes(col));
  if (missingColumns.length) {
    return { 
      isValid: false, 
      error: `Colunas faltando: ${missingColumns.join(', ')}` 
    };
  }

  const validRows = csvData.data.filter((row, index) => {
    const values = Object.values(row).map(value => value?.trim() || '');
    const isRowEmpty = values.every(value => value === '');
    
    if (isRowEmpty) {
      return false; 
    }

    requiredColumnsDisciplina.forEach(column => {
      const value = row[column];
      if (!value || value.trim() === '') {
        errors.push(`Linha ${index + 2}: Campo "${column}" não preenchido.`);
        //objeto erro tem tudo de erro q vc tem
      }
    });

    return true; 
  });

  if (validRows.length === 0) {
    return { isValid: false, error: 'Nenhuma linha válida encontrada.' };
  }

  return { 
    isValid: true, 
    data: validRows,
    warnings: errors 
  };
};
