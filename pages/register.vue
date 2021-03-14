<template>
  <div>
    <h1>Register</h1>
    <ValidationObserver v-slot="{ handleSubmit }" tag="div">
      <form
        novalidate
        class="form"
        @submit.prevent="handleSubmit(handleRegister)"
      >
        <ValidationProvider
          v-slot="{ failed, failedRules }"
          name="firstName"
          rules="required"
          tag="div"
          class="form__block"
        >
          <div :class="['form__group', { invalid: failed }]">
            <label class="form__label" for="firstName">First Name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              class="form__input"
              placeholder="First Name"
            />
            <div v-if="failedRules.required" class="form__error">
              Please enter a first name
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ failed, failedRules }"
          name="lastName"
          rules="required"
          tag="div"
          class="form__block"
        >
          <div :class="['form__group', { invalid: failed }]">
            <label class="form__label" for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              class="form__input"
              placeholder="Last Name"
            />
            <div v-if="failedRules.required" class="form__error">
              Please enter a last name
            </div>
          </div>
        </ValidationProvider>
        <div class="form__block">
          <div class="form__group">
            <label class="form__label" for="lastName">User Type</label>
            <select
              id="type"
              v-model="form.type"
              class="form__input form__input--select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
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
              placeholder="E-mail"
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
              placeholder="Password"
            />
            <div v-if="failedRules.required" class="form__error">
              Please enter a password
            </div>
            <div v-else-if="failedRules.min" class="form__error">
              Password must contain at least 8 characters
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ failed, failedRules }"
          name="confirmPassword"
          rules="required|confirmed:password"
          tag="div"
          class="form__block"
        >
          <div :class="['form__group', { invalid: failed }]">
            <label class="form__label" for="confirmPassword"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              class="form__input"
              placeholder="Confirm Password"
            />
            <div v-if="failedRules.required" class="form__error">
              Please confirm your password
            </div>
            <div v-else-if="failedRules.confirmed" class="form__error">
              Confirm Password does not match with Password
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
export default class Register extends Vue {
  form = {
    firstName: '',
    lastName: '',
    type: 'user',
    email: '',
    password: '',
    confirmPassword: '',
  };

  isLoading = false;

  async handleRegister() {
    try {
      this.isLoading = true;

      const data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        password: this.form.password,
      };

      await this.$axios.$post('/api/users/register', data);
      await this.$auth.loginWith('local', {
        data: {
          email: this.form.email,
          password: this.form.password,
        },
      });

      this.$notify({
        type: 'success',
        title: 'Success',
        text: `User registration completed!`,
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
}
</script>
