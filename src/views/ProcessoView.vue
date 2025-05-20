<template>
  <link rel="stylesheet" href="/src/assets/Processos.css" />
  <div class="pagina-processo">
    
    <header class="cabecalho">
      <img src="/src/assets/academy-2.png" alt="Logo Bonsae" width="110px" />
    </header>

    
    <div class="detalhes-processo">
        <RouterLink to="/" class="voltar" id="botaoVoltar">
          Voltar
        </RouterLink>
      <h1>Detalhes do Processo - ID 10032025</h1>
      <p>Importação de Dados do Período Letivo 2024/1</p>
      <div class="resumo-processo">
        <div class="card">
          <h3>Período Letivo</h3>
          <p>2024/1</p>
        </div>
        <div class="card">
          <h3>Data de Início</h3>
          <p>10/03/2025</p>
        </div>
        <div class="card">
          <h3>Data de Término</h3>
          <p>15/03/2025</p>
        </div>
        <div class="card status">
          <h3>Status</h3>
          <p class="concluido">Concluída</p>
        </div>
      </div>
    </div>

    
    <div class="etapas-importacao">
      <h2>Etapas da Importação</h2>
      <table class="tabela-etapas">
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Status</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Validação dos Dados</td>
            <td class="concluido">Concluída</td>
            <td>12/03/2025</td>
            <td>13/03/2025</td>
            <td>Nenhum erro encontrado</td>
          </tr>
          <tr>
            <td>Transformação dos Dados</td>
            <td class="concluido">Concluída</td>
            <td>13/03/2025</td>
            <td>14/03/2025</td>
            <td>Dados normalizados</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
