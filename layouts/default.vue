<template>
  <div class="content">
    <TheNavBar />
    <main class="main">
      <div class="container">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TheNavBar from '@/components/TheNavBar.vue';

@Component({
  components: {
    TheNavBar,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  padding-top: 25px;
}
</style>
