<template>
    <div class="vue-sidebar" :style="{'max-width': maxWidth }">
        <nav class="vue-sidebar__nav nav" role="navigation">
            <ul class="vue-sidebar__nav-list">
                <li v-for="(category,index) in navigationList" :key="`${category.name}-${index}`">
                    <input :id="`${category.name}-group-${index}`" type="checkbox" hidden v-model="category.checkbox" />
                    <label :for="`${category.name}-group-${index}`"><span class="fa fa-angle-right"></span>{{category.name}}</label>
                    <ul class="group-list">
                        <li v-for="(item, index) in category.items" :key="`${item.name}-${index}`">
                            <template v-if="!Array.isArray(item['sub-items'])">
                                <template v-if="item.to">
                                    <router-link :to="item.to">{{item.name}}</router-link>
                                </template>
                                <template v-else>
                                    <a :href="item.link" target="blank">{{item.name}}</a>
                                </template>
                            </template>
                            <template v-else>
                                <input :id="`Second__${item.name}-sub-group-${index}`" type="checkbox" hidden v-model="item.checkbox" />
                                <label :for="`Second__${item.name}-sub-group-${index}`"><span class="fa fa-angle-right"></span>{{item.name}}</label>
                                <ul class="sub-group-list">
                                    <li v-for="(subItem,index) in item['sub-items']" :key="`${subItem.name}-${index}`">
                                        <template v-if="!Array.isArray(subItem['sub-sub-items'])">
                                            <template v-if="subItem.to">
                                                <router-link :to="subItem.to">{{subItem.name}}</router-link>
                                            </template>
                                            <template v-else>
                                                <a :href="subItem.link" target="blank">{{subItem.name}}</a>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <input :id="`Third__${subItem.name}-sub-sub-group-${index}`" type="checkbox" hidden />
                                            <label :for="`Third__${subItem.name}-sub-sub-group-${index}`"><span class="fa fa-angle-right"></span> {{subItem.name}}</label>
                                            <ul class="sub-sub-group-list">
                                                <li v-for="(subSubItem,index) in subItem['sub-sub-items']" :key="`${subSubItem.name}-${index}`">
                                                    <template v-if="subSubItem.to">
                                                        <router-link :to="subSubItem.to">{{subSubItem.name}}</router-link>
                                                    </template>
                                                    <template v-else>
                                                        <a :href="subSubItem.link" target="blank">{{subSubItem.name}}</a>
                                                    </template>
                                                </li>
                                            </ul>
                                        </template>
                                    </li>
                                </ul>
                            </template>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="footer">
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, onMounted, watch, nextTick
} from 'vue'
import { 
    useRoute 
} from 'vue-router'

export default defineComponent({
    name: 'VueSidebarAccordion',
    props: {
        navigationList: {
            type: Array,
            required: true,
            default: ()=> {
                return []
            }
        },
        maxWidth: {
            type: String,
            default: '22.5rem'
        }
    },
    setup(){
        const route = useRoute()
        const initExpand = function (dom:NodeListOf<Element>){
            Array.prototype.slice.call(dom).forEach((item)=>{
                const checkInput = item.parentElement?.parentElement?.previousElementSibling?.previousElementSibling as HTMLInputElement | null | undefined
                if(checkInput){
                    const layer = checkInput.id.split('__')[0]
                    let firstLayerInput = null
                    let secondLayerInput = null
                    checkInput.checked = true
                    
                    switch(layer){
                        case 'Second':
                            firstLayerInput = checkInput?.parentElement?.parentElement?.previousElementSibling?.previousElementSibling as HTMLInputElement | null | undefined
                            if(firstLayerInput){
                                firstLayerInput.checked = true
                            }
                            break
                        case 'Third':
                            secondLayerInput = checkInput?.parentElement?.parentElement?.previousElementSibling?.previousElementSibling as HTMLInputElement | null | undefined
                            if(secondLayerInput){
                                secondLayerInput.checked = true
                            }
                            firstLayerInput = secondLayerInput?.parentElement?.parentElement?.previousElementSibling?.previousElementSibling as HTMLInputElement | null | undefined
                            if(firstLayerInput){
                                firstLayerInput.checked = true
                            }
                            break
                        default:
                            break
                    }
                }
            })
        }

        onMounted(()=>{
            setTimeout(function(){
                initExpand(document.querySelectorAll('.vue-sidebar .router-link-exact-active'))
            }, 0)
        })

        watch(
            ()=>route.path,
            ()=>{
                if(route.path){
                    nextTick(()=>{
                        initExpand(document.querySelectorAll('.vue-sidebar .router-link-exact-active'))
                    })
                }
            }
        )
    }
})
</script>

<style lang="scss">
.vue-sidebar {
    /* Styling navigation */
    margin-right: auto;
    margin-left: auto;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 65.8%);

    /* global settings in vue-sidebar */
    ol,
    ul {
        list-style: none;
    }

    ol,
    ul,
    li {
        padding: 0;
        margin: 0;
        border: 0;
        list-style: none;
        vertical-align: baseline;
        font: inherit;
    }

    a {
        text-decoration: none;
    }

    /* Hidden fallback */
    [hidden] {
        display: none;
        visibility: hidden;
    }

    /* Styling top level items */
    .nav label {
        cursor: pointer;
    }

    .nav a,
    .nav label {
        display: block;
        padding: 0.85rem;
        color: #fff;
        background-color: #151515;
        box-shadow: inset 0 -1px lighten(#151515, 3%);
        transition: all 0.25s ease-in;

        // &:focus,
        &:hover {
            color: rgba(255, 255, 255, 50%);
            background: darken(#151515, 7%);
        }
    }

    /* Styling first level lists items */
    .group-list a,
    .group-list label {
        padding-left: 2rem;
        background: #252525;
        box-shadow: inset 0 -1px lighten(#252525, 7%);

        // &:focus,
        &:hover {
            background: darken(#252525, 7%);
        }
    }

    .group-list li .router-link-exact-active {
        background-color: #605080;
    }

    /* Styling second level list items */
    .sub-group-list a,
    .sub-group-list label {
        padding-left: 4rem;
        background: #353535;
        box-shadow: inset 0 -1px lighten(#353535, 7%);

        // &:focus,
        &:hover {
            background: darken(#353535, 7%);
        }
    }

    /* Styling third level list items */
    .sub-sub-group-list a,
    .sub-sub-group-list label {
        padding-left: 6rem;
        background: #454545;
        box-shadow: inset 0 -1px lighten(#454545, 7%);

        // &:focus,
        &:hover {
            background: darken(#454545, 7%);
        }
    }

    /* Hide nested lists */
    .group-list,
    .sub-group-list,
    .sub-sub-group-list {
        overflow: hidden;
        height: 100%;
        max-height: 0;
        transition: max-height 0.5s ease-in-out;
    }

    /* reset the height when checkbox is checked */
    .vue-sidebar__nav-list input[type="checkbox"]:checked + label + ul {
        max-height: 500px; /* Most expanded height under each first level */
    }

    /* Rotating chevron icon */
    label > span {
        float: right;
        transition: transform 0.65s ease;
    }

    .vue-sidebar__nav-list input[type="checkbox"]:checked + label > span {
        transform: rotate(90deg);
    }

    /* Styling footer */
    .footer {
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: #050505;
    }
}
</style>
