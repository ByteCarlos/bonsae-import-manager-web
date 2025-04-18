<template>
  <link rel="stylesheet" href="/src/assets/secundaria.css">
  <div class="paginaSecundaria">
    <div class="topo-conteudo-secundaria">
      <h1>Importação de Dados - Controle de Processo ✔️</h1>
     <p>Gerencie e controle suas importações de dados de forma eficiente.</p>
    </div>
   <v-card>
  
        <v-card-title> 
            <h2>Novo Processo</h2>
        </v-card-title>
      <v-tabs
        v-model="tab"
        bg-color="#0A53BE"
        color="white"
        fixed-tabs
        size="large"
      >
        <v-tab value="periodo">Período</v-tab>
        <v-tab value="disciplinas">Disciplinas</v-tab>
        <v-tab value="turmas">Turmas</v-tab>
        <v-tab value="usuarios">Usuários</v-tab>
        <v-tab value="vinculos">Vínculos</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="periodo">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda cumque distinctio modi odit neque cum, porro quo, ut consequatur quam cupiditate error consequuntur, in alias deleniti accusamus corrupti iure? Itaque.
          
          </v-tabs-window-item>
  
          <v-tabs-window-item value="disciplinas">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, culpa unde iste sequi labore assumenda sapiente sed minima deleniti dicta necessitatibus, similique autem alias quia hic neque soluta, voluptate a.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, culpa unde iste sequi labore assumenda sapiente sed minima deleniti dicta necessitatibus, similique autem alias quia hic neque soluta, voluptate a.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, culpa unde iste sequi labore assumenda sapiente sed minima deleniti dicta necessitatibus, similique autem alias 
            
          </v-tabs-window-item>
  
          <v-tabs-window-item value="turmas">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima ipsum nulla facilis dolorum doloremque quam alias rerum rem. Modi molestiae quos repellendus est facilis facere cupiditate, et assumenda nisi inventore.
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
  </template>


<script>

  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>



