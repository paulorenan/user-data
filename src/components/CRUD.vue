<template>
  <v-container>
    <nav>
      <v-snackbar
        v-model="snackbar"
        :timeout="4000"
        top
        color="success"
      >
        <span>
          Usuário excluído com sucesso
        </span>
        <v-btn
          class="ml-4"
          text
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </v-snackbar>
    </nav>
    <v-row
      justify="center"
    >
      <v-col
        class="pl-6 mt-3"
        cols="12"
      >
        <h2 class="headline font-weight-bold">
          Banco de Dados de Usuários
        </h2>
      </v-col>
      <v-col
        class="pl-6 mt-3"
        cols="6"
      >
      <p class="mb-0">
        Procurar por Nome:
      </p>
      <v-text-field
        v-model="search"
        label="Nome"
        @keyup="searchUsuario"
      ></v-text-field>
      </v-col>
      <v-col
        class="pl-6 mb-2"
        cols="6"
      >
      <p>
        Ordenar por:
      </p>
      <v-btn small class="mx-1 my-1" color="primary" @click="ordenarPorNome">
        Nome
      </v-btn>
      <v-btn small class="mx-1 my-1" color="primary" @click="ordenarPorIdade">
        Idade
      </v-btn>
      <v-btn small class="mx-1 my-1" color="primary" @click="ordenarPorEmail">
        E-mail
      </v-btn>
      <v-btn small class="mx-1 my-1" color="primary" @click="ordenarPorId">
        Id
      </v-btn>
      </v-col>
      <PopUpAdicionar :editado="editado"/>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" @click="ordenarPorNome">
              Nome
            </th>
            <th class="text-left" @click="ordenarPorEmail">
              E-mail
            </th>
            <th class="text-left" @click="ordenarPorIdade">
              Idade
            </th>
            <th class="text-left" @click="ordenarPorId">
              Id
            </th>
            <th class="text-left">
              Editar
            </th>
            <th class="text-left">
              Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in users"
            :key="item.id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.id }}</td>
            <td>
              <PopUpEditar :user="item" :editado="editado" />
            </td>
            <td>
              <PopUpExcluir :user="item" :editado="editado" :snack="excluidoSnack" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import db from '../firebase'
import PopUpEditar from './PopUpEditar.vue'
import PopUpExcluir from './PopUpExcluir.vue'
import PopUpAdicionar from './PopUpAdicionar.vue'
  export default {
    name: 'CRUD',
    components: {
      PopUpEditar,
      PopUpExcluir,
      PopUpAdicionar,
    },
    data: () => ({
      backup: [],
      users: [],
      search: '',
      snackbar: false,
    }),
    async created () {
      const users = await db.collection('users').get()
      this.backup = users.docs.map((doc) => ({...doc.data(), id: doc.id}))
      this.users = this.backup
    },
    methods: {
      ordenarPorNome() {
        this.users.sort((a, b) => a.name.localeCompare(b.name))
      },
      ordenarPorIdade() {
        this.users.sort((a, b) => a.age - b.age)
      },
      ordenarPorEmail() {
        this.users.sort((a, b) => a.email.localeCompare(b.email))
      },
      ordenarPorId() {
        this.users.sort((a, b) => a.id.localeCompare(b.id))
      },
      searchUsuario() {
        this.users = this.backup.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()))
      },
      editado(array){
        this.backup = array
        this.users = array
      },
      excluidoSnack(){
        this.snackbar = true
      },
    },
  }
</script>
