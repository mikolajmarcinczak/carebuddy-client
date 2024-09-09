<template>
  <div>
    <label for="search" class="typo_label">Wyszukaj użytkownika</label>
    <vue-multiselect v-model="selectedUsers" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false"
                     :preserve-search="true" placeholder="wybierz użytkowników" label="username" track-by="username" @input="emitSelectedUsers">
      <template #selection="{ values, search, isOpen }">
        <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
          {{ values.length }} opcji wybranych
        </span>
      </template>
    </vue-multiselect>
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {ref, watch} from "vue";

export default {
  components: {
    VueMultiselect
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedUsers = ref([]);

    const emitSelectedUsers = () => {
      emit('update:selected-users', selectedUsers.value);
    };

    watch(selectedUsers, emitSelectedUsers);

    return {
      selectedUsers,
      emitSelectedUsers
    }
  },
}

</script>


<style src="vue-multiselect/dist/vue-multiselect.css"> </style>