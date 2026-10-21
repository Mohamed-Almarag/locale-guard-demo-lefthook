<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section>
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.subtitle', { count: trips.length }) }}</p>
    <NuxtLink :to="localePath('/trips')">{{ $t('home.search') }}</NuxtLink>
  </section>
</template>
