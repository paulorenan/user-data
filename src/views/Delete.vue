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
            Deletar Usuário
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
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Deletar
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
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      }
  }
}
</script>