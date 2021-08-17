<template>
  <v-app>
      <navbar />
    <v-main class="grey lighten-3">
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';


export default {
  components: { Navbar },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
