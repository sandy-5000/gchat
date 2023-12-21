<template>
  <div class="w-full bg-gray-950 rounded-lg border-2 p-3 my-3 border-indigo-600">
    <div class="flex space-x-2">
      <icons-person></icons-person>
      <span class="text-gray-400 text-xs">Anonymous</span>
    </div>
    <p class="text-gray-100 mt-4 text-sm">
      <slot />
    </p>
  </div>
</template>