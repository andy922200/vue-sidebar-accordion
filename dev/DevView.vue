<template>
    <p>{{this.$route.path}}</p>
</template>

<script lang="ts">
import {
    defineComponent 
} from 'vue'

export default defineComponent({
    name: 'DevView'
})
</script>