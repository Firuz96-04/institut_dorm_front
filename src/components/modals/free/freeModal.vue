<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, onUpdated } from 'vue';

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


const book = ref({
    student: null
})

// const data = ref({...props.data})

// const book = ref({
//     ...props.data
// })
book.value = {...props.data}
const closeModal = () => {
    emits('close');
};

console.log('fff');
watch(() => props.data, (newVal) => {
    book.value = { ...newVal };
    });

</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Заселить" :style="{ width: '30vw' }">
        <form>
            <div class="">
                <div class="flex flex-column">
                    <label for="building">Здания</label>
                    <div class="col-7 p-0 mb-1">
                     <InputText id="building" size="small" disabled v-model="book.building" />
                    </div>
                    <label for="number">Комната</label>
                    <div class="col-5 p-0 mb-1">
                     <InputText id="number" size="small" disabled v-model="book.number" />
                    </div>
                    <label for="floor">Этаж</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="floor" size="small" disabled v-model="book.floor" />
                    </div>

                    <label for="room_place">Тип комнаты</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="room_place" size="small" disabled v-model="book.room_place" />
                    </div>

                    <label for="room_place">Кол. проживаюших</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="person_count" size="small" disabled v-model="book.person_count" />
                    </div>

                    <label for="room_place">Свободные места</label>
                    <div class="col-3 p-0 mb-1">
                     <InputText id="free_place" size="small" disabled v-model="book.free_place" />
                    </div>
                    
                <!-- {{ book }} -->
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