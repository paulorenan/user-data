<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>CRUD User</h1>
      </div>
    </v-app-bar>

    <v-main>
      <CRUD/>
    </v-main>
  </v-app>
</template>

<script>
import CRUD from './components/CRUD.vue';

export default {
  name: 'App',

  components: {
    CRUD,
  },

  data: () => ({
    //
  }),
};
</script>
