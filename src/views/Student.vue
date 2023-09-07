<script setup>
import { computed, ref } from 'vue';
import { useStudentStore } from '@/store/student';
import { useStudentTypeStore } from '@/store/student_type';
import { useCountryStore } from '@/store/country';
import { useFacultyStore } from '@/store/faculty';
import deleteModal from '@/components/modals/student/deleteModal.vue';
import addModal from '@/components/modals/student/addModal.vue';
import editModal from '@/components/modals/student/editModal.vue';

const studentStore = useStudentStore();
const typeStore = useStudentTypeStore();
const countryStore = useCountryStore();
const facultyStore = useFacultyStore();

typeStore.setAllStudentType();
countryStore.setAllCountry();
facultyStore.setAllFaculty();
const student = ref({});

studentStore.setAllStudent();

const openAdd = ref(false);
const openEdit = ref(false);
const openDelete = ref(false);

const students = computed(() => studentStore.getAllStudent);
const pagination = computed(() => studentStore.pagination);
const countries = computed(() => countryStore.allCountry)
const faculties = computed(() => facultyStore.getAllFaculty)

const genders = ref([
    { name: 'женшина', code: '0' },
    { name: 'мужчина', code: '1' }
]);

const courses = ref([
    { name: '1', code: 1 },
    { name: '2', code: 2 },
    { name: '3', code: 3 },
    { name: '4', code: 4 },
    { name: '5', code: 5 },
    { name: '6', code: 6 }
]);
const student_filter = ref({
    search: null,
    country: null,
    faculty: null
});

const addHandle = () => {
    openAdd.value = true;
};

const deleteHandle = (data) => {
    const parse = JSON.parse(JSON.stringify(data));
    student.value = parse;
    openDelete.value = true;
};

const editHandle = (data) => {
    const parse = JSON.parse(JSON.stringify(data));
    const data_genders = parse.gender;
    const data_courses = parse.course;
    const gender = genders.value.filter((item) => item.code == data_genders)[0];
    const course = courses.value.filter((item) => item.code == data_courses)[0];

    openEdit.value = true;
    student.value = { ...parse, gender, course };
    console.log(student.value, 'student');
};

const my_pagin = (data) => {
    console.log(data, 'data');
};

const my_pagination = (data) => {
    const page = data.page + 1;
    const pagination = { page };
    console.log(data);
    studentStore.setAllStudent(pagination);
};

const paginateHandle = (data) => {
    console.log(data, 'data');
}

</script>

<template>
    <div class="card test_card">
        <DataTable :value="students" scrollable scrollHeight="calc(100vh - 250px)" class="p-datatable-sm" showGridlines tableStyle="min-width: 50rem">
            <Column header="#" headerStyle="width:3rem" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Имя" headerClass="font-semibold column-text-center" style="min-width: 170px" frozen></Column>
            <Column field="last_name" headerClass="font-semibold column-text-center" headerStyle="text-align: right" header="Фамилия" style="min-width: 150px"></Column>
            <Column field="country" header="Страна" headerClass="font-semibold column-text-right" style="min-width: 200px">
                <template #body="{ data }">
                    <span> {{ data.country.name }} </span>
                </template>
            </Column>
            <Column field="faculty.name" headerClass="font-semibold column-text-right" style="min-width: 200px">
                <template #header>
                    <span style="text-align: center; display: inline-flex">Факультет</span>
                </template>
            </Column>
            <Column field="phone" headerClass="font-semibold column-text-center" header="Телефон" style="min-width: 150px; text-align: center"></Column>
            <Column field="born" header="Дата рождения" headerClass="font-semibold column-text-center" style="min-width: 100px; text-align: center"></Column>
            <Column field="course" header="Курс" headerClass="font-semibold" style="min-width: 70px" class="column-text-center text-center"></Column>
            <Column field="student_type.type" header="Тип студента" headerClass="font-semibold column-text-center" style="min-width: 120px" class="text-center"></Column>

            <Column field="gender" class="column-text-center text-center" headerClass="font-semibold" header="Пол" style="min-width: 100px">
                <template #body="slotProps">
                    <span v-if="slotProps.data.gender == 0"> женшина </span>
                    <span v-else>мужчиина</span>
                </template>
            </Column>
            <Column field="actions" header="!!!" style="min-width: 90px" class="column-text-center">
                <template #body="{ data }">
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle(data)" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <template #header>
                <div class="student_header">
                    <div class="student_header__filter">
                        <InputText v-model="student_filter.search" type="search" class="my_input" placeholder="студент" />
                        <Dropdown v-model="student.country" showClear class="st_select ml-4 md:w-14rem" :options="countries.map((item) => ({ name: item.name, code: item.id }))" 
                            optionLabel="name" optionValue="code" placeholder="страна" size="small" />

                        <Dropdown v-model="student.faculty" showClear class="st_select ml-4 md:w-14rem" :options="faculties.map((item) => ({ name: item.name, code: item.id }))" 
                            optionLabel="name" optionValue="code" placeholder="факультет" size="small" />
                    </div>
                    <div class="">
                        <Button label="Добавить" @click="addHandle" size="small" raised />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination">
                        <Paginator v-if="pagination.next" class="custom_pagination" @page="paginateHandle" :rows="pagination.page_size" :totalRecords="pagination.total"></Paginator>
                    </div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
    <Teleport to="body">
        <deleteModal :visible="openDelete" :student="student" @close="openDelete = false" />
        <addModal :visible="openAdd" @close="openAdd = false" />
        <editModal :visible="openEdit" :student="student" @close="openEdit = false" />
    </Teleport>
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
.custom_pagination {
    .p-paginator {
        padding: 0.1rem 0.1rem !important;
        background: none;
        .p-paginator-page {
            height: 2rem !important;
            min-width: 2rem !important;
        }

        button {
            height: 2rem !important;
            min-width: 2rem !important;
        }
    }
}
.my_icon {
    .pi {
        font-size: 1.3rem !important;
    }
}
.main_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.student_header {
    display: flex;
    justify-content: space-between;

    &__filter {
    }
}

.column-text-right {
    .p-column-header-content {
        text-align: center; // or center
        display: block !important;
    }
}
.align-right {
    text-align: right;
}
.align-center {
    text-align: center;
}
.p-datatable th[class*='align-'] .p-column-header-content {
    display: inline-flex;
}
.test_card {
    padding: 1rem;
}
</style>
