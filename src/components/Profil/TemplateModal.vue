<template>
  <div>
    <!-- Przycisk otwierający modal -->
    <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Otwórz modal
    </button>

    <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-8 rounded-lg">
        <!-- Treść modala -->
        <div>
          <h2 class="text-lg font-bold mb-4">Tytuł modala</h2>
          <p>Tutaj możesz umieścić treść modala.</p>
        </div>
        <!-- Przycisk zamykający modal -->
        <div class="flex justify-end mt-6">
          <button @click="closeModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Zamknij
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    }
  }
};
</script>

<style>
/* Dostosuj stylizację modala według potrzeb */
</style>