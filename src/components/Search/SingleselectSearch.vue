<template>
  <div>
    <vue-multiselect v-model="selectedUser" :options="options" :multiple="false" :close-on-select="true" :clear-on-select="false"
                     :preserve-search="true" placeholder="wybierz użytkownika" label="username" track-by="username" @input="emitSelectedUser">
      <template #selection="{ values, search, isOpen }">
        <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
          {{ values.length }} opcji wybranych
        </span>
      </template>
    </vue-multiselect>
  </div>
</template>

<script lang="ts">
import VueMultiselect from "vue-multiselect";
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
    const selectedUser = ref(null);

    const emitSelectedUser = () => {
      emit('update:selected-user', selectedUser.value);
    };

    watch(selectedUser, emitSelectedUser);

    return {
      selectedUser,
      emitSelectedUser
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>