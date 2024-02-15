<template>
  <v-app>
    <navigation-menu>
      <router-view />
    </navigation-menu>
  </v-app>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu";

export default {
  name: "App",

  components: {
    NavigationMenu,
  },

  data: () => ({}),
};
</script>
