<template>
  <div class="login">
    <form ref="authForm" class="login-form" @submit.prevent="onSubmitForm">
      <h1 class="auth-title">Log in</h1>

      <AppField
        label="Username"
        required
        :isInvalid="$v.name.$error"
        @input="setField($event, 'name')"
        initFocus
      >
        <template v-slot:error>
          <p v-if="!$v.name.required">This field is required</p>
          <p v-if="!$v.name.username">Incorrect username format</p>
        </template>
      </AppField>

      <AppField
        label="Phone Number"
        required
        :isInvalid="$v.phone.$error"
        @input="setField($event, 'phone')"
      >
        <template v-slot:error>
          <p v-if="!$v.phone.required">This field is required</p>
          <p v-if="!$v.phone.phoneNumber">Incorrect phone format</p>
        </template>
      </AppField>

      <AppButton
        title="Log In"
        class="form-btn"
        className="primary"
        type="submit"
        :pending="pending"
      />
    </form>
  </div>
</template>

<script>
import { helpers, required } from "vuelidate/lib/validators";
import { APP_ROUTES } from "@/router/routes";

const phoneNumber = helpers.regex("serial", /^[0-9().-]+$/);
const username = helpers.regex("serial", /^[A-Za-z:._]+$/);

import { validationMixin } from "@/mixins/ValidationMixin";

export default {
  name: "LoginView",
  mixins: [validationMixin],

  computed: {},

  data() {
    return {
      name: "",
      phone: "",
    };
  },

  validations: {
    name: {
      required,
      username,
    },
    phone: {
      required,
      phoneNumber,
    },
  },

  methods: {
    async onSubmitForm() {
      const payload = {
        name: this.name,
        phone: this.phone,
      };

      try {
        await this.sendData(payload, "auth/login", APP_ROUTES.TODO);
      } catch (e) {
        console.error(e);
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.auth-title {
  margin-bottom: 18px;
}

.form-btn {
  width: 100%;
}
</style>
