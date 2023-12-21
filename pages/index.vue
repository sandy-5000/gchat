<template></template>
<script>
definePageMeta({
  middleware: [() => {
    return navigateTo('/chat')
  }],
})
</script>