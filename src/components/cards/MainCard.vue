<script setup>
import {defineProps, reactive, computed} from 'vue'
import MiniCard from './MiniCard.vue'
const props = defineProps({
    build: {
        type: Object,
        required: false
    }
})

const title = computed(() => {
    const item = props.build.build_name
    return item.charAt(0).toUpperCase() + item.slice(1);
})
const exam = reactive({})
</script>
<template>
    <div class="custom_card">
        <div class="custom_card__title">
            <span>
                {{ title }}
            <!-- {{ build.build_name }} -->
            </span>
        </div>
        <div class="custom_card__main">
            <MiniCard  :count="build.total_rooms" title="Комнаты" image="all_rooms"/>           
            <MiniCard  :count="build.busy_rooms" title="Занято" image="busy_room"/>
            <MiniCard  :count="build.free_rooms" title="Свободно" image="free_room"/>

            <MiniCard :count="build.all_student" title="Студенты" image="people"/>
            <MiniCard :count="build.men" title="Мужчины" image="man"/>
            <MiniCard :count="build.women" title="Женшины" image="woman"/>


        </div>
        
    </div>
</template>

<style lang="scss" scoped>

.custom_card {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 220px;
    background-color: #4361ee;
    border-radius: 1.5rem;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-bottom: 20px;

    &__title {
        display: flex;
        height: 25%;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        padding: 5px 10px;
        justify-content: space-between;
        align-items: center;
        span {
            display: block;
            font-size: 22px;
            color: #fef9ef;
            font-weight: 500;
        }
    }

    &__main {
        display: flex;
        height: 75%;
        flex-wrap: wrap;
        padding: 5px;
        align-items: center;
        justify-content: space-around;
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