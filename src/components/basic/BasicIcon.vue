<template>
  <svg :width="width" :height="height" :fill="color">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  width: { type: [Number, String], default: 24 },
  height: { type: [Number, String], default: 24 },
  color: { type: String, default: '#000' },
});
</script>
