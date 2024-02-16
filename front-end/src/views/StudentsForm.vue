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
                    v-mask="'########'"
                    label="Registro Acadêmico"
                    :rules="[validateEmptyField]"
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
                <v-btn type="submit" :loading="sendingData" color="primary">
                  Salvar
                </v-btn>

                <v-btn color="red darken-4" class="cancel-button" to="/students"
                  >Cancelar</v-btn
                >
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
      sendingData: false,
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

  methods: {
    validateCpfField(cpf) {
      console.log(cpf);
      return validateCPF(cpf) || "CPF inválido";
    },

    validateEmailField(email) {
      return validateEmail(email) || "E-mail inválido";
    },

    validateEmptyField(value) {
      return !!value || "Campo obrigatório";
    },

    async submitStudentForm() {
      const isFormValid = this.$refs.form.validate();
      if (!isFormValid) {
        eventBus.$emit("warning", "Preencha todos os campos obrigatórios");
        return;
      }

      this.sendingData = true;
      try {
        await this.$api.post("students", this.student);
        eventBus.$emit("success", "Estudante cadastrado com sucesso");
        this.sendingData = false;
        this.$router.push("/students");
      } catch (error) {
        if (error.response.status === 409) {
          eventBus.$emit("warning", "RA informado já cadastrado no sistema");
        } else {
          eventBus.$emit("error", "Ocorreu um erro ao cadastrar o estudante");
        }
        this.sendingData = false;
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