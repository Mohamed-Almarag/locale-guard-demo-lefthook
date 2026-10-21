<script setup lang="ts">
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta
}))
</script>

<template>
  <AppHeader />
  <main>
    <NuxtPage />
  </main>
</template>
