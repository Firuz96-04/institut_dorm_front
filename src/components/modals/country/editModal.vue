<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useCountryStore } from '@/store/country';

const countryStore = useCountryStore();

const emits = defineEmits({
    close: null
});

const props = defineProps({
    country_data: {
        type: Object,
        required: false
    },

    visible:{
        type: Boolean,
        default:false,
        required: true
    }
});

// const visible = ref(false);

const closeModal = () => emits('close');

const editCountry = () => {
    countryStore.addCountry({
        country: country.value,
        cb: closeModal
    })
};
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Редактировать страну" :style="{ width: '20vw' }">
        <form @submit.prevent="editCountry">
            <div class="flex flex-column align-items-center justify-content-center text-justify">
                <div class="col-8 p-0 mb-2">
                    <label class="text-lg font-medium mb-1" for="building">Страна</label>
                    <div>
                        <InputText id="building" class="text-base mt-1 min-w-full" :maxlength="20" size="small" type="search" v-model="country_data.name" />
                    </div>
                </div>
                <div class="col-8 p-0 mb-2">
                    <Button type="submit" class="min-w-full p-2 text-base" size="small" label="Редактировать" />
                </div>
            </div>
        </form>
    </Dialog>
</template>
