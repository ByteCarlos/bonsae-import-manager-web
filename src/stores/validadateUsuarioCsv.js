export const requiredColumnsUsuario = [
    'Perfil*',
    'Subperfil',	
    'Nome*',	
    'Nº da OAB', 
    'Seccional (UF OAB)',	
    'E-mail*',	
    'MatrÍcula (IES)',
    'Telefone'
  ];
  
  export const validateUsuarioCsv = (csvData) => {
    const csvColumns = csvData.meta.fields;
    const errors = [];
  
    const missingColumns = requiredColumnsUsuario.filter(col => !csvColumns.includes(col));
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
  
      requiredColumnsUsuario.forEach(column => {
        const value = row[column];
        if (!value || value.trim() === '') {
          errors.push(`Linha ${index + 2}: Campo "${column}" não preenchido.`);
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
  