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
          @click="pegarUsuarioId"
        >
          Deletar
        </v-btn>
      </v-row>
    </v-container>
    <v-row
      class="mb-3"
      justify="center"
    >
      <v-col
        class="mb-3"
        cols="12"
        v-for="usuario in user"
        :key="usuario.id"
      >
        <p>
          Você vai deletar o seguinte usuário:
        </p>
        <p>
          <strong>Id:</strong> {{ usuario.id }}
        </p>
        <p>
          <strong>Nome:</strong> {{ usuario.name }}
        </p>
        <p>
          <strong>Idade:</strong> {{ usuario.age }}
        </p>
        <p>
          <strong>E-mail:</strong> {{ usuario.email }}
        </p>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="deletarUsuario"
        >
          Confirmar
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="error"
          class="mr-4"
          @click="limparUsuario"
        >
          Cancelar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import db from '../firebase'
  export default {
    data: () => ({
      valid: false,
      user: [],
      id: '',
      idRules: [
        (v) => !!v || 'Id é obrigatório',
      ],
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      async pegarUsuarioId() {
        this.user = []
        const users = await db.collection('users').get()
        const user = users.docs.find(doc => doc.id === this.id.trim())
        if (user) {
          this.user = [{...user.data(), id: user.id}]
        } else {
          this.user = []
        }
      },
      limparUsuario() {
        this.user = []
        this.id = ''
        this.$refs.form.reset()
      },
      async deletarUsuario() {
        await db.collection('users').doc(this.user[0].id).delete()
        this.limparUsuario()
      },
  }
}
</script>