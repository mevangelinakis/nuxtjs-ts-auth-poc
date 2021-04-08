<template>
  <div>
    <h1>Home Page</h1>
    <table v-if="hasUsers">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Fullname</th>
          <th scope="col">Email</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { User } from '@/types';

@Component({
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('/api/users/all');

      const users = response.users.models;
      return {
        users,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  },
})
export default class Index extends Vue {
  users = [] as User[];

  get hasUsers() {
    return this.users.length;
  }
}
</script>
