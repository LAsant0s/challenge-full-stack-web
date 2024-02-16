<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Cadastrar estudante</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitStudentForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.ra"
                    label="Registro Acadêmico"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.name"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.doc"
                    label="CPF"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn type="submit" :loading="sendingData" color="primary"
                  >Salvar</v-btn
                >
                <v-btn color="red darken-4" to="/students">Cancelar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from "@/utils/eventBus";

export default {
  data() {
    return {
      sendingData: false,
      student: {
        ra: "",
        name: "",
        doc: "",
        email: "",
      },
    };
  },

  methods: {
    async submitStudentForm() {
      try {
        this.sendingData = true;
        await this.$api.post("students", this.student);
        eventBus.$emit("success", "Estudante cadastrado com sucesso");
        this.sendingData = false;
        this.$router.push("/students");
      } catch (error) {
        console.log(error);
        eventBus.$emit("error", "Ocorreu um erro ao cadastrar o estudante");
        this.sendingData = false;
      }
    },
  },
};
</script>