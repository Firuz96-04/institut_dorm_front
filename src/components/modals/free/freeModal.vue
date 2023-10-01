<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue';
import { useFreePlaceStore } from '@/store/free_place';
import { usePriviligeStore } from '@/store/privilige';
import { getDate } from '@/helpers/get_date'

const freePlaceStore = useFreePlaceStore();
const priviligeStore = usePriviligeStore()

let timeout;

const emits = defineEmits({
    close: null
});

priviligeStore.setAllPrivilige()

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



watch(
    () => props.data,
    (newVal) => {
        const sana = getDate(null)

        book_date.value = sana
    }
);

const free_student = computed(() => freePlaceStore.getFreeStudent);
const priviliges = computed(() => priviligeStore.getAllPrivilige);

const student = ref(null)
const privilege = ref(null)
const book_date = ref('')

const closeModal = () =>  {
    student.value = null
    privilege.value = null
    freePlaceStore.free_students = []
    emits('close')
};

const filterMy = (e) => {
    
    
    // if (e.value == null) {
    //     freePlaceStore.free_students = []
    //     console.log('null');
    // } else {
    //     freePlaceStore.setAllFreeStudent({ search: e.value });
    //     student.value = e.value
    // }

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    timeout = setTimeout(() => {
        freePlaceStore.setAllFreeStudent({ search: e.value });
    }, 500);
};

const addFree = () => {
    
    let start_date = ''

    if ( typeof(book_date.value) == 'string') {
        start_date  = book_date.value
    }
    else {
        start_date = getDate(book_date.value)
    }


    const apartment = {
        student: student.value,
        room: props.data.room_id,
        privilege: privilege.value,
        book_date: start_date

    }

    freePlaceStore.addFreeBook({
        apartment: apartment,
        cb: closeModal
    })
};


const my_change = (e) => {
    if(e.value == null) {
        freePlaceStore.free_students = []
    }
}

</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Заселить" :style="{ width: '27vw' }">
        <!-- {{ book }} -->
        <form @submit.prevent="addFree">
            <div class="p-fluid">
                <div class="field grid">
                    <label for="building" class="col-12 md:col-2 md:mb-0 font-medium">Здания</label>
                    <div class="col-12 md:col-7 ml-6">
                        <InputText id="building" class="text-lg p-2 font-medium" disabled v-model="data.building" :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="number" class="col-12 md:col-2 md:mb-0 font-medium">Комната</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="number" class="text-lg text-center p-2 font-medium" v-model="data.number" disabled :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="floor" class="col-12 md:col-2 md:mb-0 font-medium">Этаж</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="floor" class="text-lg text-center p-2 font-medium" v-model="data.floor" disabled :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="room_place" class="col-12 md:col-2 md:mb-0 font-medium">Тип комнаты</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="room_place" class="text-lg text-center p-2 font-medium" v-model="data.room_place" disabled :maxlength="4" size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="person_count" class="col-12 md:col-2 md:mb-0 font-medium">Кол. проживаюших</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="person_count" class="text-lg text-center p-2 font-medium" v-model="data.person_count" disabled :maxlength="4" size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="free_place" class="col-12 md:col-2 md:mb-0 font-medium">Свободные места</label>
                    <div class="col-12 md:col-4 ml-6">
                        <InputText id="free_place" class="text-lg text-center p-2 font-medium" v-model="data.free_place" disabled :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="free_place" class="col-12 md:col-2 md:mb-0 font-medium">Студент</label>
                    <div class="col-12 md:col-7 ml-6">
                        <Dropdown v-model="student" class="st_select" :filter="true" :options="free_student" 
                        @filter="filterMy" optionLabel="name" optionValue="code" placeholder="поиск студента" @change="my_change" 
                        :resetFilterOnHide="true" showClear size="small">
                            <template #empty>
                                    пусто
                            </template>
                        </Dropdown>
                    </div>
                </div>

                <div class="field grid">
                    <label for="free_place" class="col-12 md:col-2 md:mb-0 font-medium">Привилегия</label>
                    <div class="col-12 md:col-7 ml-6">
                        <Dropdown v-model="privilege" showClear class="st_select" :options="priviliges.map((item) => ({ name: item.name, code: item.id }))"
                         optionLabel="name" optionValue="code" placeholder="привилегия" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="free_place" class="col-12 md:col-2 md:mb-0 font-medium">Дата</label>
                    <div class="col-12 md:col-4 ml-6">
                        <Calendar v-model="book_date" size="small" dateFormat="yy-mm-dd"/>
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
}
.field {
    margin-bottom: 0.7rem;
}

.my_form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
</style>
