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
        <button type="submit" class="btn" :disabled="isLoading">Login</button>
      </form>
    </ValidationObserver>
    <div class="social">
      <button type="button" class="btn btn--google" @click="handleGoogleLogin">
        Google
      </button>
      <button type="button" class="btn btn--facebook" @click="handleFBLogin">
        Facebook
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  form = {
    email: '',
    password: '',
  };

  isLoading = false;

  async handleLogin() {
    try {
      this.isLoading = true;
      await this.$auth.loginWith('local', {
        data: this.form,
      });

      this.$notify({
        type: 'success',
        title: 'Success',
        text: `Welcome back ${this.$auth.user.firstName} ${this.$auth.user.lastName}!`,
      });
    } catch (e) {
      const { data } = e.response;

      this.$notify({
        type: 'error',
        title: 'Failed',
        text: data.message,
      });
    } finally {
      this.isLoading = false;
    }
  }

  async handleGoogleLogin() {
    await this.$auth.loginWith('google', {
      params: { prompt: 'select_account' },
    });
  }

  async handleFBLogin() {
    await this.$auth.loginWith('facebook');
  }
}
</script>
