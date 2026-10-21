<script setup lang="ts">
const { locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <header>
    <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
    <NuxtLink :to="localePath('/trips')">{{ $t('nav.trips') }}</NuxtLink>
    <nav>
      <NuxtLink
        v-for="item in locales"
        :key="item.code"
        :to="switchLocalePath(item.code)"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </header>
</template>
