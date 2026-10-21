<script setup lang="ts">
const { locale, t } = useI18n()

const guests = ref(2)
const coupon = ref('')
const couponError = ref('')
const accepted = ref(false)
const trip = trips[0]!
const total = computed(() => formatPrice(trip.price * trip.nights, locale.value))

function applyCoupon() {
  couponError.value = coupon.value
    ? t('checkout.coupon.invalid', { code: coupon.value })
    : ''
}
</script>

<template>
  <section>
    <h1>{{ $t('checkout.title') }}</h1>
    <p>{{ trip.city }}: {{ $t('checkout.dates', { start: '12/05', end: '15/05' }) }}</p>
    <p>{{ $t('checkout.guests', guests) }}</p>

    <label>
      {{ $t('checkout.coupon.label') }}
      <input v-model="coupon">
    </label>
    <button type="button" @click="applyCoupon">{{ $t('checkout.coupon.apply') }}</button>
    <p v-if="couponError">{{ couponError }}</p>

    <p>{{ $t('checkout.total', { amount: total }) }}</p>
    <label>
      <input v-model="accepted" type="checkbox">
      {{ $t('checkout.terms') }}
    </label>
    <button type="button" :disabled="!accepted">{{ $t('checkout.pay', { amount: total }) }}</button>
  </section>
</template>
