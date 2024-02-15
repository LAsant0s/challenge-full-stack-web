<template>
  <div>
    <v-app-bar app color="black" dark clipped-left>
      <v-app-bar-nav-icon @click="isOpen = !isOpen"></v-app-bar-nav-icon>

      <router-link to="/">
        <v-img
          class="mx-2"
          src="@/assets/logo.png"
          max-height="100"
          max-width="100"
          contain
        ></v-img>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="isOpen"
      absolute
      clipped
      :mobile-breakpoint="0"
      color="#202427"
    >
      <v-list nav>
        <v-list-item link to="/students" class="list-item-container">
          <v-list-item-icon>
            <v-icon color="white">mdi-account-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="list-item">
              Modulo de estudantes
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script>
export default {
  name: "NavigationMenu",

  data: () => ({
    isOpen: true,
  }),
};
</script>

<style scoped lang="scss">
.list-item {
  color: white;
}
</style>
