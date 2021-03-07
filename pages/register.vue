<template>
  <div>
    <h1>Register</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        novalidate
        class="form"
        @submit.prevent="handleSubmit(handleRegister)"
      >
        <ValidationProvider
          v-slot="{ errors, failedRules }"
          name="firstName"
          rules="required"
        >
          <div :class="['form__group', { invalid: errors.length }]">
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
          v-slot="{ errors, failedRules }"
          name="lastName"
          rules="required"
        >
          <div :class="['form__group', { invalid: errors.length }]">
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
        <ValidationProvider
          v-slot="{ errors, failedRules }"
          name="email"
          rules="required|email"
        >
          <div :class="['form__group', { invalid: errors.length }]">
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
          v-slot="{ errors, failedRules }"
          name="password"
          rules="required|min:8"
        >
          <div :class="['form__group', { invalid: errors.length }]">
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
          v-slot="{ errors, failedRules }"
          name="confirmPassword"
          rules="required|confirmed:password"
        >
          <div :class="['form__group', { invalid: errors.length }]">
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
export default class Login extends Vue {
  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  isLoading = false;

  handleRegister() {
    this.isLoading = true;
  }
}
</script>
