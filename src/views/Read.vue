<template>
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in users"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.age }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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
      this.users = users.docs.map(doc => doc.data())
      console.log(this.users)
    }
  }
</script>