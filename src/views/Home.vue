<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold
          mb-3"
      >
      Bem vindo ao nosso sistema de dados de Usuarios
      </h2>
      </v-col>
      <v-col
        class="mb-3"
        cols="12"
      >
        <p>
          Temos atualmente {{users}} usuários no nosso banco de dados
        </p>
      </v-col>
      <v-col
        class="mb-3"
        cols="12"
      >
        <p>
          O que você deseja fazer?
        </p>
      </v-col>
      <v-col
        class="mb-3"
        cols="15"
      >
        <v-btn
          color="primary"
          class="button"
          dark
          to="/create"
        >
          Criar Usuário
        </v-btn>
        <v-btn
          color="primary"
          class="button"
          dark
          to="/read"
        >
          Listar Usuários
        </v-btn>
        <v-btn
          
          color="primary"
          class="button"
          dark
          to="/update"
        >
          Atualizar Usuário
        </v-btn>
        <v-btn
          color="primary"
          class="button"
          dark
          to="/delete"
        >
          Deletar Usuário
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from '../firebase'
export default {
  data() {
    return {
    users: '',
    }
  },
  async created () {
    const users = await db.collection('users').get()
    this.users = users.size
  },
  methods: {
    clica() {
      console.log('clicou');
    }
  }
}
</script>

<style>
.button {
  margin: 0 10px 10px 0;
}
</style>
