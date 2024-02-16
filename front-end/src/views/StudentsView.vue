<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Estudantes</v-card-title>

      <v-card-subtitle>Lista de estudantes cadastrados</v-card-subtitle>

      <v-spacer />

      <v-card-actions>
        <v-btn color="primary" to="students/new">Adicionar Estudante</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>
        <v-spacer />

        <v-form @submit.prevent="getStudents" class="d-flex align-center">
          <v-text-field
            v-model="searchTerm"
            label="Pesquisar estudante"
            single-line
            hide-details
            clearable
            @click:clear="clearFilterAndSearch"
            class="mr-2"
          />

          <v-btn color="primary" type="submit">Buscar</v-btn>
        </v-form>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="students"
        :options.sync="options"
        :server-items-length="totalStudents"
        :loading="loading"
        :items-per-page="5"
        loading-text="Buscando alunos"
        no-data-text="Não há dados para ser exibidos"
        class="elevation-1"
      />
    </v-card>
  </div>
</template>

<script>
import { eventBus } from "@/utils/eventBus";

export default {
  data() {
    return {
      totalStudents: 0,
      students: [],
      loading: true,
      options: {},
      searchTerm: "",
      headers: [
        {
          text: "Registro Acadêmico",
          value: "ra",
          sortable: false,
          filterable: false,
        },
        { text: "Nome", value: "name", sortable: false, filterable: false },
        { text: "CPF", value: "doc", sortable: false, filterable: false },
        { text: "E-mail", value: "email", sortable: false, filterable: false },
        { text: "Ações", value: "actions", sortable: false, filterable: false },
      ],
    };
  },

  created() {
    this.getStudents();
  },

  watch: {
    options: {
      handler() {
        this.getStudents();
      },
      deep: true,
    },
  },
  methods: {
    clearFilterAndSearch() {
      this.searchTerm = "";
      this.getStudents();
    },

    async getStudents() {
      this.loading = true;

      const { page, itemsPerPage } = this.options;
      const search = this.searchTerm ? this.searchTerm : null;

      let params = { page, search };

      if (itemsPerPage <= 0) {
        params = { ...params, limit: this.totalStudents };
      } else {
        params = { ...params, limit: itemsPerPage };
      }

      try {
        const response = await this.$api.get("/students", { params });
        this.students = response.data.students;
        this.totalStudents = Number(response.data.totalStudents);
        this.loading = false;
      } catch (error) {
        eventBus.$emit("error", "ocorreu um erro ao buscar os estudantes");
      }
    },
  },
};
</script>
