<template>
  <div>
    <h1>Admin Access Page</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  middleware: 'authAdmin',
})
export default class Admin extends Vue {}
</script>
