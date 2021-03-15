<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav__block">
          <NuxtLink to="/" class="nav__link">Home</NuxtLink>
          <NuxtLink to="/free" class="nav__link">Free Access</NuxtLink>
          <NuxtLink to="/loggedIn" class="nav__link">Logged In Access</NuxtLink>
          <NuxtLink to="/admin" class="nav__link">Admin Access</NuxtLink>
        </div>
        <div v-if="$auth.loggedIn" class="nav__block">
          <span class="user">{{ $auth.user.email }}</span>
          <button class="btn btn--link nav__link" @click="$auth.logout()">
            Logout
          </button>
        </div>
        <div v-else class="nav__block">
          <NuxtLink to="/login" class="nav__link">Login</NuxtLink>
          <NuxtLink to="/register" class="nav__link">Register</NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #073b4c;
}

.nav {
  align-items: center;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  height: 60px;
  text-decoration: none;
  width: 100%;

  &__block {
    align-items: center;
    display: flex;

    .nav__link {
      color: #fff;
      display: inline-block;
      font-weight: 700;
      font-size: 1rem;
      margin: 0 0.625rem;
      text-decoration: none;

      &:hover,
      &.nuxt-link-exact-active {
        color: #e9c46a;
      }

      &:hover,
      &:focus,
      &.nuxt-link-exact-active {
        outline: none;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .user {
    color: #fff;
    padding: 0 0.625rem;
  }
}
</style>
