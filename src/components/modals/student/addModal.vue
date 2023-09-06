<script setup>
import { useStudentStore } from '@/store/student';
import { useStudentTypeStore } from '@/store/student_type';
import { useCountryStore } from '@/store/country';
import { useFacultyStore } from '@/store/faculty';
import { defineEmits, ref, computed } from 'vue';

const emits = defineEmits({
    close: null
});
const studentStore = useStudentStore();

const typeStore = useStudentTypeStore()
const countryStore = useCountryStore()
const facultyStore = useFacultyStore()

const courses = ref([
    {name: '1', code: 1},
    {name: '2', code: 2},
    {name: '3', code: 3},
    {name: '4', code: 4},
    {name: '5', code: 5},
    {name: '6', code: 6},
])
const gender = ref([
    {name:'женшина', code: 0},
    {name:'мужчина', code: 1},
])
const visible = ref(false);
const student = ref({
    name: null,
    last_name: null,
    phone: null,
    born: null,
    gender: null,
    course: null,
    country: null,
    student_type: null,
    faculty: null,
    address: ''
});

const closeModal = () => {
    student.value.name = null;
    student.value.last_name = null;
    student.value.phone = null
    student.value.born = null
    student.value.gender = null
    student.value.country = null
    student.value.course = null
    student.value.student_type = null
    student.value.faculty = null
    student.value.address = ''
    emits('close');
};
const addStudent = () => {
    // const born = '12.03.22'
    // const date = student.value.born
    // const born = format(date, 'dd-MM-yyyy');

    const today = student.value.born;
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // month is zero-based
    const day = today.getDate();

    const born = `${year}-${month}-${day}`


    // const test = {...student.value, born}
    // console.log(test);
    studentStore.addStudent({
        student: {...student.value, born},
        cb: closeModal
    });
};
const types = computed(() => typeStore.getAllStudentType)
const countries = computed(() => countryStore.allCountry)
const faculties = computed(() => facultyStore.getAllFaculty)
</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить студента" :style="{ width: '25vw' }">
        <form @submit.prevent="addStudent">
            <!-- align-items-center justify-content-center text-justify -->
            <div class="p-fluid">
                <div class="field grid mt-1">
                    <label for="name" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Имя</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText id="name" v-model="student.name" type="search" :maxlength="20" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="family" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Фамилия</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText v-model="student.last_name" type="search" :maxlength="20" id="family" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="phone" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Телефон</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText v-model="student.phone" id="phone" :maxlength="15" type="search" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="country" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Страна</label>
                    <div class="col-12 md:col-8 ml-4">
                        <Dropdown v-model="student.country" :options="countries.map(item => ({name: item.name, code: item.id}))"
                         id="country" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="faculty" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Факультет</label>
                    <div class="col-12 md:col-8 ml-4">
                        <Dropdown v-model="student.faculty" :options="faculties.map(item => ({name: item.name, code: item.id}))"
                         id="faculty" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="type" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Тип студента</label>
                    <div class="col-12 md:col-7 ml-4">
                        <Dropdown v-model="student.student_type" :options="types.map(item => ({name: item.type, code: item.id}))"
                         id="type" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="course" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Курс</label>
                    <div class="col-12 md:col-5 ml-4">
                        <Dropdown v-model="student.course" :options="courses" id="course" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="date" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Дата рождения</label>
                    <div class="col-12 md:col-5 ml-4">
                        <Calendar v-model="student.born" size="small" id="date" dateFormat="dd.mm.yy"/>
                      </div>
                </div>
                <div class="field grid">
                    <label for="gender" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Пол</label>
                    <div class="col-12 md:col-6 ml-4">
                        <Dropdown v-model="student.gender" :options="gender" id="gender" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="address" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Адрес</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Textarea v-model="student.address" id="address" rows="5" cols="30" size="small" />
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
