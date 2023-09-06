<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, onUpdated, computed } from 'vue';
import { useFreePlaceStore } from '@/store/free_place';

const freePlaceStore = useFreePlaceStore();

let timeout;

const emits = defineEmits({
    close: null
});

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
        default: null
    }
});

const book = ref(null)

const free_student = computed(() => freePlaceStore.getFreeStudent);

const student = ref(null)

const closeModal = () =>  {
    emits('close')

};


const filterMy = (e) => {
    console.log(free_student.value);
    console.log(e.value)
    console.log(e.value == null, 'null');
    if (e.value == null) {
        freePlaceStore.free_students = []
        // console.log('kk');
    } else {
        freePlaceStore.setAllFreeStudent({ search: e.value });
    }
};

const addFree = () => {
    console.log(book.value, 'book');
};

watch(
    () => props.data,
    (newVal) => {
        book.value = { ...newVal };
    }

);
</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Заселить" :style="{ width: '27vw' }">
        <form @submit.prevent="addFree">
            <div class="p-fluid">
                <div class="field grid">
                    <label for="building" class="col-12 md:col-2 md:mb-0 font-medium">Здания</label>
                    <div class="col-12 md:col-7 ml-6">
                        <InputText id="building" class="text-lg p-2 font-medium" disabled v-model="book.building" :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="number" class="col-12 md:col-2 md:mb-0 font-medium">Комната</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="number" class="text-lg text-center p-2 font-medium" v-model="book.number" disabled :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="floor" class="col-12 md:col-2 md:mb-0 font-medium">Этаж</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="floor" class="text-lg text-center p-2 font-medium" v-model="book.floor" disabled :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="room_place" class="col-12 md:col-2 md:mb-0 font-medium">Тип комнаты</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="room_place" class="text-lg text-center p-2 font-medium" v-model="book.room_place" disabled :maxlength="4" size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="person_count" class="col-12 md:col-2 md:mb-0 font-medium">Кол. проживаюших</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="person_count" class="text-lg text-center p-2 font-medium" v-model="book.person_count" disabled :maxlength="4" size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="free_place" class="col-12 md:col-2 md:mb-0 font-medium">Свободные места</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="free_place" class="text-lg text-center p-2 font-medium" v-model="book.free_place" disabled :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="free_place" class="col-12 md:col-2 md:mb-0 font-medium">Студент</label>
                    <div class="col-12 md:col-7 ml-6">
                        <Dropdown v-model="student" editable class="st_select" panelClass="my_drop" editble showClear @change="filterMy" :options="free_student" size="small" optionLabel="name" placeholder="поиск студента">
                            <template #empty panelClass="my_drop">
                                    пусто
                            </template>
                        </Dropdown>
                    </div>
                </div>

                <div class="field grid">
                    <div class="col-12">
                        <Button type="submit" label="Добавить" size="small" />
                    </div>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<style lang="scss">
.my_drop {
    .p-dropdown-panel   {
        padding: 0.1rem !important;
        color: red !important;
    }
}
.st_select {
    .p-inputtext {
        padding: 0.55rem 0.55rem !important;
    }
    ul {
    .p-dropdown-panel {
        padding: 0.1rem !important;
        color: red !important;
    } 
    }
    // .p-dropdown-items {
    //     padding: 0.1rem !important;
    // }

    // .p-dropdown-panel {
    //     padding: 0.1rem;   
    // }
}
.field {
    margin-bottom: 0.7rem;
}

.my_form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    // background-color: #cda;
}
</style>
