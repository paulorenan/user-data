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
          flat
          class="ml-4"
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
            Editar Usuário
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="id"
            :rules="idRules"
            label="Id Usuário"
            required
          ></v-text-field>
        </v-col>
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
          @click="atualizarUsuario"
          :loading="loading"
        >
          Editar
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
      id: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      idRules: [
        (v) => !!v || 'Id é obrigatório',
      ],
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
      atualizarUsuario() {
        if(this.name === '' || this.age === '' || this.email === '' || this.id === '') {
          this.$refs.form.validate()
          return
        }
        this.loading = true
        db.collection('users').doc(this.id.trim()).update({
          name: this.name,
          email: this.email,
          age: parseInt(this.age),
        })
        .then(() => {
          this.reset()
          this.$refs.form.reset()
          this.loading = false
          this.snackbarText = 'Usuário atualizado com sucesso'
          this.snackbarColor = 'success'
          this.snackbar = true
        }).catch(() => {
          this.loading = false
          this.snackbarText = 'Erro ao atualizar usuário'
          this.snackbarColor = 'error'
          this.snackbar = true
        })
      },
      reset () {
        this.$refs.form.reset()
      }
  }
}
</script>