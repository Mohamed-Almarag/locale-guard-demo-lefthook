<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section>
    <h1>{{ $t('trips.title') }}</h1>
    <article v-for="trip in trips" :key="trip.id">
      <h2>{{ trip.city }}</h2>
      <p>{{ $t('trips.from', { price: formatPrice(trip.price, locale) }) }}</p>
      <p>{{ $t('trips.nights', trip.nights) }}</p>
      <p>{{ $t('trips.rating', { rating: trip.rating, count: trip.reviews }) }}</p>
      <NuxtLink :to="localePath('/checkout')">{{ $t('trips.book') }}</NuxtLink>
    </article>
    <NuxtLink :to="localePath('/')">{{ $t('trips.back') }}</NuxtLink>
  </section>
</template>
