<template>
  <div class="flex flex-col items-center justify-center">
    <div class="profile-picture-container">
      <img :src="imageUrl" alt="Obraz profilu" class="rounded-full w-32 h-32 object-cover profile-picture"/>
      <input type="file" @change="uploadImage" ref="fileInput" class="file-input">
    </div>
    <div class="mt-2">
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
    const fileInput = ref<HTMLInputElement | null>(null);
    const imageUrl = ref(props.initialImageUrl);
    const imageUrlInput = ref(props.initialImageUrl);

    const uploadImage = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl.value = e.target?.result as string;
          emit('update:imageUrl', imageUrl.value);
        };
        reader.readAsDataURL(target.files[0]);
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
      fileInput,
      uploadImage,
      onUrlChange
    }
  }
}
</script>

<style scoped>
.profile-picture-container {
  position: relative;
  display: inline-block;
}

.profile-picture {
  display: block;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>