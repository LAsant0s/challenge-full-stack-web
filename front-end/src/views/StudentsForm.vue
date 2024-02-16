<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ studentRa ? "Editar estudante" : "Cadastrar estudante" }}
          </v-card-title>

          <div
            v-if="searchingStudent"
            class="loading-spinner-wrapper flex-grow-1 d-flex align-center justify-center"
          >
            <v-progress-circular
              indeterminate
              color="primary"
              class="loading-spinner"
            />
          </div>

          <v-card-text>
            <v-form ref="form" @submit.prevent="submitStudentForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.ra"
                    v-mask="'########'"
                    label="Registro Acadêmico"
                    :rules="[validateEmptyField]"
                    :disabled="!!studentRa"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.name"
                    label="Nome"
                    :rules="[validateEmptyField]"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.doc"
                    label="CPF"
                    v-mask="'###.###.###-##'"
                    :rules="[validateEmptyField, validateCpfField]"
                    :disabled="!!studentRa"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="student.email"
                    label="E-mail"
                    :rules="[validateEmptyField, validateEmailField]"
                  />
                </v-col>
              </v-row>

              <v-card-actions>
                <v-btn type="submit" :loading="submittingData" color="primary">
                  Salvar
                </v-btn>

                <v-btn
                  color="red darken-4"
                  class="cancel-button"
                  to="/students"
                >
                  Cancelar
                </v-btn>
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
import { mask } from "vue-the-mask";
import { validateCPF, validateEmail } from "@/utils/validations";

export default {
  data() {
    return {
      studentRa: null,
      searchingStudent: false,
      submittingData: false,
      student: {
        ra: "",
        name: "",
        doc: "",
        email: "",
      },
    };
  },

  directives: {
    directives: { mask },
  },

  created() {
    const { ra } = this.$route.params;
    this.studentRa = ra ? ra : null;

    if (ra) {
      this.searchingStudent = true;
      this.getStudent(ra);
    }
  },

  methods: {
    validateCpfField(cpf) {
      return validateCPF(cpf) || "CPF inválido";
    },

    validateEmailField(email) {
      return validateEmail(email) || "E-mail inválido";
    },

    validateEmptyField(value) {
      return !!value || "Campo obrigatório";
    },

    async getStudent(ra) {
      try {
        const { data } = await this.$api.get(`students/${ra}`);
        this.student = data;
        this.searchingStudent = false;
      } catch (error) {
        eventBus.$emit("error", "Ocorreu um erro ao buscar o estudante");
        this.searchingStudent = false;
        this.$router.push("/students");
      }
    },

    async submitStudentForm() {
      const isFormValid = this.$refs.form.validate();
      if (!isFormValid) {
        eventBus.$emit("warning", "Preencha todos os campos obrigatórios");
        return;
      }

      this.submittingData = true;

      try {
        if (!this.studentRa) {
          await this.$api.post("students", this.student);
          eventBus.$emit("success", "Estudante cadastrado com sucesso");
        } else {
          await this.$api.put(`students/${this.studentRa}`, {
            name: this.student.name,
            email: this.student.email,
          });
          eventBus.$emit("success", "Estudante atualizado com sucesso");
        }

        this.submittingData = false;
        this.$router.push("/students");
      } catch (error) {
        if (error.response.status === 409) {
          eventBus.$emit(
            "warning",
            "Registro Acadêmico informado já cadastrado no sistema"
          );
        } else {
          eventBus.$emit("error", "Ocorreu um erro ao cadastrar o estudante");
        }
        this.submittingData = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cancel-button {
  color: white;
}
</style>