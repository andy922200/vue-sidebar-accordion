<template>
    <div id="app">
        <vue-sidebar :navigation-list="navigationList" />
        <router-view />
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
    },
    data(){
        return {
            navigationList: [
                {
                    checkbox: false,
                    name: 'First Level',
                    items: [
                        {
                            name: '1st level item',
                            to: {
                                path: '/'
                            }
                        },
                        {
                            name: 'Second Level',
                            checkbox: false,
                            'sub-items': [
                                {
                                    name: '2nd level nav item',
                                    link: 'https://tw.yahoo.com'
                                },
                                {
                                    name: 'Third level',
                                    checkbox: false,
                                    'sub-sub-items': [
                                        {
                                            name: '3rd level nav item',
                                            link: 'https://www.google.com'
                                        },
                                        {
                                            name: '3rd level nav item',
                                            link: 'https://tw.yahoo.com'
                                        },
                                        {
                                            name: '3rd level nav item',
                                            to: {
                                                path: '/about'
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: '2nd level nav item',
                                    link: 'https://www.microsoft.com'
                                },
                                {
                                    name: '2nd level nav item',
                                    link: 'https://www.apple.com'
                                }
                            ]
                        },
                        {
                            name: '1st level item',
                            link: 'https://www.netflix.com'
                        }
                    ]
                },
                {
                    checkbox: false,
                    name: 'World',
                    items: [
                        {
                            name: 'Antarctica',
                            to: {
                                path: '/about'
                            }
                        }
                    ]
                }
            ]
        }
    }
})
</script>

