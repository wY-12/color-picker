<script setup>
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
</script>

<template>
    <Vue3ColorPicker v-model="value" mode="gradient" :showColorList="false" :showEyeDrop="false"/>
</template>