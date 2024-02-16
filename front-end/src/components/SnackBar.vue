<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbarVisible"
      :color="snackBarType"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarVisible = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { eventBus } from "@/utils/eventBus";

export default {
  data: () => ({
    snackbarVisible: false,
    text: "test snackbar",
    timeout: 3000,
    snackBarType: "",
  }),

  created() {
    eventBus.$on("success", (message) => {
      this.activateSnackBar("success", message);
    });

    eventBus.$on("error", (message) => {
      this.activateSnackBar("error", message);
    });
  },

  destroyed() {
    eventBus.$off("success");
    eventBus.$off("error");
  },

  methods: {
    activateSnackBar(type, message) {
      this.snackBarType = type;
      this.text = message;
      this.snackbarVisible = !this.snackbarVisible;
    },
  },
};
</script>