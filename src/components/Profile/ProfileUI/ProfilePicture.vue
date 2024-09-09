<template>
  <div class="profile-picture">
    <img :src="imageUrl" alt="Obraz profilu" class="rounded-full w-32 h-32 object-cover">
    <div class="mt-2">
      <input type="file" @change="uploadImage" class="hidden" ref="fileInput">
      <input type="text" v-model="imageUrlInput" @blur="onUrlChange" placeholder="Wprowadź URL obrazu"
             class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'

export default {
  props: {
    initialImageUrl: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const imageUrl = ref(props.initialImageUrl);
    const imageUrlInput = ref(props.initialImageUrl);

    const uploadImage = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl.value = e.target?.result as string;
          emit('update:imageUrl', imageUrl.value);
        };
        reader.readAsDataURL(file);
      }
    };

    const onUrlChange = () => {
      if (imageUrlInput.value) {
        imageUrl.value = imageUrlInput.value;
        emit('update:imageUrl', imageUrl.value);
      }
    };

    watch(() => props.initialImageUrl, (newImageUrl) => {
      imageUrl.value = newImageUrl;
      imageUrlInput.value = newImageUrl;
    });

    return {
      imageUrl,
      imageUrlInput,
      uploadImage,
      onUrlChange
    }
  }
}
</script>

<style scoped>
.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>