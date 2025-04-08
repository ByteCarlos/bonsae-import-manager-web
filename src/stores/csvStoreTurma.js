import { defineStore } from 'pinia';

export const useCsvStore = defineStore('csv', {
  state: () => ({
    data: [],
    errors: []
  }),

  actions: {
    validateCsv(fileContent) {
        const lines = fileContent.split('\n').map(line => line.trim());
        const validTurnos = ['Matutino', 'Vespertino', 'Noturno'];
      
        this.data = [];
        this.errors = [];
      
        if (lines.length === 0) {
          this.errors.push("O arquivo CSV está vazio.");
          return;
        }

        const firstLine = lines[0];
        const separator = firstLine.includes(';') ? ';' : ',';
      
        const header = firstLine.split(separator).map(h => h.trim());
        const expectedHeader = ['Disciplina (Código)', 'Turno', 'Turma', 'Código da turma'];
      
        if (JSON.stringify(header) !== JSON.stringify(expectedHeader)) {
          this.errors.push(
            `Erro no cabeçalho!  
            ➡️ Esperado: ${expectedHeader.join(' | ')}  
            ❌ Encontrado: ${header.join(' | ')}  
            ⚠️ Verifique se o arquivo está separado por "${separator}" corretamente.`
          );
          return;
        }

        lines.slice(1).forEach((line, index) => {
          if (!line) return;
      
          const columns = line.split(separator).map(col => col.trim());
          const [disciplina, turno, turma, codigoTurma] = columns;

          let rowError = '';
      
          if (!disciplina || !turno || !turma || !codigoTurma) {
            rowError = 'Todos os campos devem estar preenchidos.'
            this.errors.push(`Linha ${index + 2}: ${rowError}`);
          } else if (!validTurnos.includes(turno)) {
            rowError= Turno `"${turno}" inválido. Valores aceitos: ${validTurnos.join(', ')}`;
            this.errors.push(`Linha ${index + 2}: ${rowError}`);
          } 

          this.data.push({ disciplina, turno, turma, codigoTurma, error: rowError });

        });
      }      
  }
});
