<template>
    <link rel="stylesheet" href="/src/assets/principal.css">
    <div class="pagina">
    <link rel="stylesheet" href="/src/assets/header.css">
     <header class="cabecalho">
        <img src="/src/assets/academy-2.png" alt="Logo Bonsae" width="110px">
      </header>
  
      
        <div class="topo-conteudo">
          <div>
            <h1>Importação de Dados - Controle de Processo </h1>
            <p>Gerencie e controle suas importações de dados de forma eficiente.</p>
          </div>
          <RouterLink to="/secundaria" class="botao" id="botaoNovoProcesso">
            Novo Processo
          </RouterLink>
        </div>

        

        <table class="tabela-processos">
          <thead>
            <tr>
              <th>ID do Processo</th>
              <th>Período Letivo</th>
              <th>Data de Início</th>
              <th>Data de Término</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>03042025</td>
              <td>2024/1</td>
              <td>03/04/2025</td>
              <td>-</td>
              <td><span class="status pendente">Pendente</span></td>
              <td>
                <button class="botaoTabela" id="botaoAbortar">Abortar</button>
                <button class="botaoTabela" id="botaoContinuar">Continuar</button>
              </td>
            </tr>
            <tr>
              <td>17032025</td>
              <td>2024/1</td>
              <td>17/03/2025</td>
              <td>20/03/2025</td>
              <td><span class="status concluido">Concluída</span></td>
              <td>
                <RouterLink to="/detalhes" class="botaoTabela" id="botaoVizualizar">
                  Visualizar </RouterLink>
              </td>
            </tr>
            <tr>
              <td>17032025</td>
              <td>2024/1</td>
              <td>17/03/2025</td>
              <td>20/03/2025</td>
              <td><span class="status concluido">Concluída</span></td>
              <td><RouterLink to="/detalhes" class="botaoTabela" id="botaoVizualizar">
                Visualizar </RouterLink></td>
            </tr>
            <tr>
              <td>17032025</td>
              <td>2024/1</td>
              <td>17/03/2025</td>
              <td>20/03/2025</td>
              <td><span class="status concluido">Concluída</span></td>
              <td><RouterLink to="/detalhes" class="botaoTabela" id="botaoVizualizar">
                Visualizar </RouterLink></td>
            </tr>
            <tr>
              <td>17032025</td>
              <td>2024/1</td>
              <td>17/03/2025</td>
              <td>20/03/2025</td>
              <td><span class="status concluido">Concluída</span></td>
              <td><RouterLink to="/detalhes" class="botaoTabela" id="botaoVizualizar">
                Visualizar </RouterLink></td>
            </tr>
            <tr>
              <td>17032025</td>
              <td>2024/1</td>
              <td>17/03/2025</td>
              <td>20/03/2025</td>
              <td><span class="status concluido">Concluída</span></td>
              <td><RouterLink to="/detalhes" class="botaoTabela" id="botaoVizualizar">
                Visualizar </RouterLink></td>
            </tr>
     
          </tbody>
        </table>
      
    </div>
  </template>

  

  
  <script>

  </script>