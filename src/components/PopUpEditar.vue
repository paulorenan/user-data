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
        <v-btn class="primary" small dark v-on="on">Editar</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Editar Usuário</v-card-title>
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
            @click="editarUsuario"
            :disabled="!valid"
            :loading="loading"
          >
            Editar
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
  name: 'PopupEditar',
  props: {
    user: Object,
    editado: Function,
  },
  data: () => ({
    valid: false,
    nome: '',
    nomeRules: [
      v => !!v || 'Nome é obrigatório',
      v => v.length <= 50 || 'Nome dever ter no máximo 50 caracteres',
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
  created() {
    this.nome = this.user.name
    this.email = this.user.email
    this.idade = this.user.age
    this.id = this.user.id
  },
  methods: {
    async editarUsuario() {
      this.loading = true
      db.collection('users').doc(this.id).update({
        name: this.nome,
        email: this.email,
        age: this.idade,
      }).then(async () => {
        const get = await db.collection('users').get()
        this.usersEditado = get.docs.map((doc) => ({...doc.data(), id: doc.id}))
        this.editado(this.usersEditado)
        this.loading = false
        this.snackbar = true
        this.snackbarColor = 'success'
        this.snackbarText = 'Usuário editado com sucesso'
        this.dialog = false
      })
    },
  },
};
</script>