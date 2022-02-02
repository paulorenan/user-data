<template>
  <v-form 
  v-model="valid"
  ref="form"
  lazy-validation
  >
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
            v-model="firstname"
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
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Editar
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Limpar Entradas
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      valid: false,
      id: '',
      idRules: [
        (v) => !!v || 'Id é obrigatório',
        (v) => /^\d+$/.test(v) || 'Id deve ser um número',
      ],
      firstname: '',
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => v.length <= 50 || 'Nome dever ter no máximo 50 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+/.test(v) || 'E-mail inválido',
      ],
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      }
  }
}
</script>