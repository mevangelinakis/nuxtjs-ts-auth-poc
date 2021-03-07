<template>
  <div>
    <h1>Login</h1>
    <ValidationObserver v-slot="{ handleSubmit }" tag="div">
      <form novalidate class="form" @submit.prevent="handleSubmit(handleLogin)">
        <ValidationProvider
          v-slot="{ failed, failedRules }"
          name="email"
          rules="required|email"
          tag="div"
          class="form__block"
        >
          <div :class="['form__group', { invalid: failed }]">
            <label class="form__label" for="email">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form__input"
            />
            <div v-if="failedRules.required" class="form__error">
              Please enter an e-mail
            </div>
            <div v-else-if="failedRules.email" class="form__error">
              Please enter a valid e-mail
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ failed, failedRules }"
          name="password"
          rules="required|min:8"
          tag="div"
          class="form__block"
        >
          <div :class="['form__group', { invalid: failed }]">
            <label class="form__label" for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form__input"
            />
            <div v-if="failedRules.required" class="form__error">
              Please enter a password
            </div>
            <div v-else-if="failedRules.min" class="form__error">
              Password must contain at least 8 characters
            </div>
          </div>
        </ValidationProvider>
        <button type="submit" class="btn" :disabled="isLoading">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  form = {
    email: 'johndoe@email.com',
    password: '12345678',
  };

  isLoading = false;

  handleLogin() {
    this.isLoading = true;

    try {
      this.$auth.loginWith('local', {
        data: this.form,
      });
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
