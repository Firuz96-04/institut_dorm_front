<script setup>
</script>
<template>
    <div class="custom_card">
        <div class="custom_card__title">title</div>
        <div class="custom_card__main">
            <div>1</div>
            <div>3</div>
            <div>4</div>

        </div>
    </div>
</template>

<style lang="scss">

.custom_card {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 200px;
    // background-color: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &__title {
        flex-grow: 1;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        background-color: #bbd0ff;
    }

    &__main {
        display: flex;
        flex-grow: 3;
        background-color: rgb(147, 204, 135);
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        
    }


}

</style>