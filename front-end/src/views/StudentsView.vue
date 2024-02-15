<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Estudantes</v-card-title>
      <v-card-subtitle>Lista de estudantes cadastrados</v-card-subtitle>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="primary" to="students/new">Adicionar Estudante</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchTerm"
          label="Pesquisar estudante"
          single-line
          hide-details
        >
        </v-text-field>
        <v-btn color="primary" @click="() => getStudents()">Buscar</v-btn>
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
      >
        <!-- <template v-slot:[`item.actions`]="student">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="editStudent(student)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar Aluno</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="openDeleteConfirmation(student)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Excluir Aluno</span>
          </v-tooltip>
        </template> -->
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
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
    async getStudents() {
      try {
        this.loading = true;

        const { page, itemsPerPage } = this.options;
        const search = this.searchTerm ? this.searchTerm : null;

        let params = { page, search };

        if (itemsPerPage <= 0) {
          params = { ...params, limit: this.totalStudents };
        } else {
          params = { ...params, limit: itemsPerPage };
        }

        const response = await this.$api.get("/students", { params });
        this.students = response.data.students;
        this.totalStudents = Number(response.data.totalStudents);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
