<template>
  <v-container class="pl-0">
    <v-row
      justify="center"
    >
      <v-col
        class="pl-6 mt-3"
        cols="12"
      >
        <h2 class="headline font-weight-bold">
          Lista de Usuarios
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
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Nome
            </th>
            <th class="text-left">
              E-mail
            </th>
            <th class="text-left">
              Idade
            </th>
            <th class="text-left">
              Id
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
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import db from '../firebase'
  export default {
    data () {
      return {
        backup: [],
        users: [],
        search: '',
      }
    },
    async created () {
      const users = await db.collection('users').get()
      this.backup = users.docs.map((doc) => ({...doc.data(), id: doc.id}))
      this.users = this.backup
      console.log(this.users)
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
    }
  }
</script>