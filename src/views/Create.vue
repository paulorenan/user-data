<template>
  <v-form
  class="mx-4 my-2"
  v-model="valid"
  ref="form"
  lazy-validation
  >
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
      text
      @click="snackbar = false"
    >
      Fechar
    </v-btn>
    </v-snackbar>
  </nav>
    <v-container>
      <v-row
        class="mb-3"
        justify="center"
      >
        <v-col
          class="mb-3"
          cols="12"
        >
          <h2 class="headline font-weight-bold">
            Criar Usuário
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="50"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="age"
            :rules="ageRules"
            label="Idade"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-btn
          :disabled="!valid"
          color="success"
          class="ml-2"
          @click="criarUsuario"
          :loading="loading"
        >
          Criar
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import db from '../firebase'
  export default {
    data: () => ({
      valid: false,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      name: '',
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => v.length <= 50 || 'Nome dever ter no máximo 50 caracteres',
      ],
      age: '',
      ageRules: [
        v => !!v || 'Idade é obrigatório',
        v => /^\d+$/.test(v) || 'Idade deve ser um número',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+/.test(v) || 'E-mail inválido',
      ],
    }),
    methods: {
      criarUsuario () {
        if (this.name === '' || this.age === '' || this.email === '') {
          this.$refs.form.validate()
          return
        }
        this.loading = true
        db.collection('users').add({
          name: this.name,
          age: parseInt(this.age),
          email: this.email,
        }).then(() => {
          this.loading = false
          this.reset()
          this.snackbarText = 'Usuário criado com sucesso'
          this.snackbarColor = 'success'
          this.snackbar = true
        }).catch(() => {
          this.snackbarText = 'Erro ao criar usuário'
          this.snackbarColor = 'error'
          this.snackbar = true
          this.loading = false
        })
      },
      reset () {
        this.$refs.form.reset()
      }
  }
}
</script>