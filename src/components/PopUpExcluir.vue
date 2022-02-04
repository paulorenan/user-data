<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="error" small dark v-on="on">Excluir</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Excluir Usuário</v-card-title>
        <v-col cols="12">
          <h3>Você tem certeza que deseja excluir o seguinte usuário?</h3>
          <p>
            <strong>Nome:</strong> {{ user.name }}
          </p>
          <p>
            <strong>Idade:</strong> {{ user.age }}
          </p>
          <p>
            <strong>E-mail:</strong> {{ user.email }}
          </p>
        </v-col>
          <v-btn
            class="mx-4 my-4"
            color="primary"
            @click="excluirUsuario"
            :loading="loading"
          >
            Excluir
          </v-btn>
          <v-btn
            class="mx-4 my-4"
            color="error"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '../firebase'
export default {
  name: 'PopUpExcluir',
  props: {
    user: Object,
    editado: Function,
    snack: Function,
  },
  data: () => ({
    dialog: false,
    loading: false,
    userExcluido: [],
  }),
  created() {
    this.name = this.user.name;
    this.email = this.user.email;
    this.idade = this.user.age;
  },
  methods: {
    async excluirUsuario() {
      this.loading = true
      await db.collection('users').doc(this.user.id).delete()
      const get = await db.collection('users').get()
      this.usersExcluido = get.docs.map((doc) => ({...doc.data(), id: doc.id}))
      this.editado(this.usersExcluido)
      this.snack();
      this.loading = false
      this.dialog = false
    },
  },
}
</script>