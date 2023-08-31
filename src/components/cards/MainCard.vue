<script setup>
import {defineProps, reactive} from 'vue'
import MiniCard from './MiniCard.vue'
const props = defineProps({
    build: {
        type: Object,
        required: false
    }
})


const exam = reactive({})
</script>
<template>
    <div class="custom_card">
        <div class="custom_card__title">
            {{ build.build_name }}
        </div>
        <div class="custom_card__main">
            <MiniCard  :count="build.total_rooms" title="Комнаты" image="all_rooms"/>           
            <MiniCard  :count="build.busy_rooms" title="Занятые" image="busy_room"/>
            <MiniCard  :count="build.free_rooms" title="Свободные" image="free_room"/>

            <MiniCard :count="build.all_student" title="Студенты" image="people"/>
            <MiniCard :count="build.men" title="мужчины" image="man"/>
            <MiniCard :count="build.women" title="женшины" image="woman"/>


        </div>
        
    </div>
</template>

<style lang="scss">

.custom_card {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 220px;
    // background-color: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-bottom: 20px;

    &__title {
        height: 25%;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        background-color: #bbd0ff;
    }

    &__main {
        display: flex;
        height: 75%;
        flex-wrap: wrap;
        padding: 5px;
        align-items: center;
        justify-content: space-around;
        background-color: rgb(147, 204, 135);
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        padding: 0 5px;
    }

    // &__mini {
    //     display: flex;
    //     justify-content: space-between;
    //     width: 120px;
    //     height: 60px;
    //     border-radius: 4px;
    //     padding: 4px 8px;

    //     background-color: rgb(109, 152, 194);

    //     &__info {
    //         width: 60%;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: center;
    //         align-items: start;
    //     }

    //     &__count {
    //         width: 40%;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;

    //         span {
    //             font-size: 16px;
    //         }
    //     }
    // }
}

</style>