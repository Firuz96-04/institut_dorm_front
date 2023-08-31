<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, onUpdated, computed } from 'vue';
import { useFreePlaceStore } from '@/store/free_place';


const freePlaceStore = useFreePlaceStore()

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
        default: {}
    }
});


const free_student = computed(() => freePlaceStore.getFreeStudent)

const book = ref({
    student: null
})
const selectedCity = ref(null)
book.value = {...props.data}
const closeModal = () => {
    emits('close');
};

const filterMy = (e) => {
    if(e.value == null) {
        // free_student.value = []
    }
    else {
        // selectedCity.value = e.value.name
        // selectedCity.value = e.name    
        freePlaceStore.setAllFreeStudent(
        {search: e.value}
        )

        }


        // selectedCity.value = '2222'
}

const addFree = () => {
    console.log(selectedCity);
}

watch(() => props.data, (newVal) => {
    book.value = { ...newVal };
    });

</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Заселить" :style="{ width: '25vw' }">
        <form @submit.prevent="addFree">
                <div class="flex flex-column align-items-center justify-content-center text-justify">
                    <div>
                    <label class="text-lg font-medium mb-4" for="building">Здания</label>
                    <div class="col-7 p-0 mb-1">
                     <InputText id="building" size="small" disabled v-model="book.building" />
                    </div>
                </div>
                <div>
                    <label class="text-lg font-medium mb-4" for="number">Комната</label>
                    <div class="col-5 p-0 mb-2">
                     <InputText id="number" size="small" disabled v-model="book.number" />
                    </div>
                </div>
                <div>    
                    <label class="text-lg font-medium mb-4" for="floor">Этаж</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="floor" size="small" disabled v-model="book.floor" />
                    </div>
                </div>
                <div>
                    <label class="text-lg font-medium mb-4" for="room_place">Тип комнаты</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="room_place" size="small" disabled v-model="book.room_place" />
                    </div>
                </div>
                <div>
                    <label class="text-base font-medium mb-4" for="room_place">Кол. проживаюших</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="person_count" size="small" disabled v-model="book.person_count" />
                    </div>
                </div>
                <div>
                    <label class="text-base font-medium mb-4" for="room_place">Свободные места</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="free_place" size="small" disabled v-model="book.free_place" />
                    </div>
                </div>
                <div>
                    <label class="text-base font-medium mb-4" for="room_place">Свободные места</label>
                    <div class="col-3 p-0 mb-1">
                        <Dropdown 
                            v-model="selectedCity" 
                            editable 
                            showClear 
                            :filter="true"

                            @filter="filterMy"
                            :options="free_student" 
                            optionLabel="name"
                            placeholder="Select a City" class="w-full md:w-14rem" />

                    </div>
                </div>
                 <!-- <div class="flex flex-column gap-2">
                    <label for="username">Кол. проживающих</label>
                    <div class="col-4 p-0 mb-1">
                     <InputText id="username" size="small" v-model="value" aria-describedby="username-help" />
                    </div>
                 </div>
                 <div class="flex flex-column gap-2">
                    <label for="username">Свободные места</label>
                    <div class="col-4 p-0 mb-1">
                     <InputText id="username" size="small" v-model="value" aria-describedby="username-help" />
                    </div>
                 </div> -->
                <!-- <div class="field grid">
                    <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">Здания</label>
                    <div class="col-12 md:col-8">
                        <InputText id="name3" type="text" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">Комната</label>
                    <div class="col-12 md:col-8">
                        <InputText id="name3" type="text" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="email3" class="col-6 mb-3 md:col-2 md:mb-0">Этаж</label>
                    <div class="col-12 md:col-8">
                        <InputText id="email3" type="text" size="small" />
                    </div>
                </div> 
              <div class="field grid">
                    <label for="email3" class="col-6 mb-3 md:col-2 md:mb-0">Тип</label>
                    <div class="col-12 md:col-8">
                        <InputText id="email3" type="text" size="small" />
                    </div>
                </div>
            
            -->
            <Button type="submit" label="Submit" size="small" />
            </div>
        </form>
    </Dialog>
</template>


<style lang="scss">
.my_form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    // background-color: #cda;
}
</style>