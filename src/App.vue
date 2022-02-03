<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            CRUD Usuários
          </v-list-item-title>
          <v-list-item-subtitle>
            Criar, atualizar e deletar usuários
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>DataBase Usuários</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null ,
      items: [
        {title: 'Inicio', icon: 'mdi-home', to: '/'},
        {title: 'Criar Usuário', icon: 'mdi-account-plus', to: '/create'},
        {title: 'Listar Usuários', icon: 'mdi-account-multiple', to: '/list'},
        {title: 'Editar Usuário', icon: 'mdi-account-edit', to : '/update'},
        {title: 'Deletar Usuário', icon: 'mdi-delete', to: '/delete'}
      ],
      }),
  }
</script>