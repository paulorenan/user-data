<template>
  <div class="text-center">
    <nav>
      <v-snackbar
        v-model="snackbar"
        :timeout="4000"
        top
        :color="snackbarColor"
      >
        <span>
          {{ snackbarText }}
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
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="primary mb-4" dark v-on="on">Adicionar Usuário</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Adicionar Usuário</v-card-title>
        <v-form
          class="pa-3"
          v-model="valid"
          ref="form"
          :lazy-validation="true"
        >
          <v-text-field
            v-model="nome"
            :rules="nomeRules"
            label="Nome"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="idade"
            :rules="idadeRules"
            label="Idade"
          ></v-text-field>
          <v-btn
            class="mt-4"
            color="primary"
            @click="adicionarUsuario"
            :disabled="!valid"
            :loading="loading"
          >
            Adicionar
          </v-btn>
          <v-btn
            class="mt-4 ml-6"
            color="error"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '../firebase'
export default {
  name: 'PopupAdicionar',
  props: {
    editado: Function,
  },
  data: () => ({
    valid: false,
    nome: '',
    nomeRules: [
      v => !!v || 'Nome é obrigatório',
    ],
    email: '',
    emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+/.test(v) || 'E-mail inválido',
    ],
    idade: '',
    idadeRules: [
        v => !!v || 'Idade é obrigatório',
        v => /^\d+$/.test(v) || 'Idade deve ser um número',
    ],
    id: '',
    dialog: false,
    usersEditado: [],
    loading: false,
    snackbar: false,
    snackbarColor: '',
    snackbarText: '',
  }),
  methods: {
    async adicionarUsuario() {
    if (this.nome === '' || this.email === '' || this.idade === '') {
      this.snackbar = true
      this.snackbarColor = 'error'
      this.snackbarText = 'Preencha todos os campos'
    } else {
      this.loading = true
      const user = {
        name: this.nome,
        email: this.email,
        age: this.idade,
      }
      await db.collection('users').add(user)
      const get = await db.collection('users').get()
      const userAdicionado = get.docs.map((doc) => ({...doc.data(), id: doc.id}))
      this.editado(userAdicionado)
      this.loading = false
      this.snackbar = true
      this.dialog = false
      this.snackbarColor = 'success'
      this.snackbarText = 'Usuário adicionado com sucesso'
      this.$refs.form.reset()
    }
    },
  },
};
</script>