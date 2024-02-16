<template>
  <v-app>
    <navigation-menu>
      <snack-bar />
      <router-view />
    </navigation-menu>
  </v-app>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu";
import SnackBar from "@/components/SnackBar";

export default {
  name: "App",

  components: {
    NavigationMenu,
    SnackBar,
  },

  data: () => ({}),
};
</script>
