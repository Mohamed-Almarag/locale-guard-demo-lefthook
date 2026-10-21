<script setup lang="ts">
const trip = trips[0]!
</script>

<template>
  <section>
    <h1>{{ $t('details.title') }}: {{ trip.city }}</h1>
    <h2>{{ $t('details.included') }}</h2>
    <ul>
      <li>{{ $t('details.breakfast') }}</li>
      <li>{{ $t('details.transfer') }}</li>
    </ul>
    <p>{{ $t('details.cancel', { date: '10/05' }) }}</p>
  </section>
</template>
