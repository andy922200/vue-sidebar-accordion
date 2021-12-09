<template>
    <div id="app">
        <vue-sidebar />
    </div>
</template>

<script lang="ts">
import {
    defineComponent 
} from 'vue'
import VueSidebar from '@/vue-sidebar.vue'

export default defineComponent({
    name: 'ServeDev',
    components: {
        VueSidebar
    }
})
</script>

