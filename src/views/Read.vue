<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        class="mb-3"
        cols="12"
      >
        <h2 class="headline font-weight-bold">
          Lista de Usuarios
        </h2>
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
        users: []
      }
    },
    async created () {
      const users = await db.collection('users').get()
      this.users = users.docs.map((doc) => ({...doc.data(), id: doc.id}))
      console.log(this.users)
    }
  }
</script>