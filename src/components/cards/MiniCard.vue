<script setup>
import { defineProps, computed, ref } from 'vue';

const props = defineProps({
    count: {
        type: Number,
        defaut: 0,
        requied: false
    },
    title: {
        type: String,
        requied: false
    },
    image: {
        type: String,
        requied: false
        
    }
})

const completeImageUrl = computed(() => {
      return new URL(`../../assets/images/${props?.image}.svg`, import.meta.url).href;
    });

</script>

<template>
    <div class="mini">
        <div class="mini__info">
            <img :src="completeImageUrl"/>
            <div>{{title}}</div>
        </div>
        <div class="mini__count">
            <span>{{ count }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mini {
    display: flex;
    justify-content: space-between;
    width: 120px;
    height: 60px;
    border-radius: 4px;
    padding: 4px 8px;

    background-color: rgb(109, 152, 194);

    &__info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }

    &__count {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-size: 16px;
        }
    }
}
</style>
