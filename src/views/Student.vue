<script setup>
import { computed, ref } from 'vue';
import { useStudentStore } from '@/store/student';

const studentStore = useStudentStore();
studentStore.setAllStudent();

const students = computed(() => studentStore.getAllStudent);
const student_filter = ref({
    search: null
})
</script>

<template>
    <div class="card test_card">
        <div class="student_header">
        <InputText v-model="student_filter.search" class="my_input"  placeholder="студент" />
        </div>
        <DataTable :value="students" scrollHeight="400px" class="p-datatable-sm" scrollable showGridlines tableStyle="min-width: 50rem">
            <Column header="#" headerStyle="width:3rem" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Имя" style="min-width: 170px" frozen></Column>
            <Column field="last_name" headerStyle="text-align: right" header="Фамилия" style="min-width: 150px"></Column>
            <Column field="country" header="Страна" headerClass="column-text-right" style="min-width: 200px">
                <template #body="{data}">
                    <span> {{ data.country.name }} </span>
                </template>
            </Column>
            <Column field="faculty.name"   headerClass="column-text-right" style="min-width: 200px;">
                <template #header>
                <span style="text-align: center;display: inline-flex">Факультет</span>
            </template>
            
            </Column>
            <Column field="phone"  headerClass="column-text-right" header="Телефон" style="min-width: 150px; text-align: center;"></Column>
            <Column field="born" header="Дата рождения" style="min-width: 100px; text-align: center;"></Column>
            <Column field="course" header="Курс" style="min-width: 70px; text-align: center;"></Column>
            <Column field="student_type.type" header="Тип студента" style="min-width: 120px; text-align: center;"></Column>

            <Column field="gender" bodyStyle="text-align: center;" headerStyle="text-align: right; color:red" header="Пол" style="min-width: 100px;">
                <template #body="slotProps">
                    <span v-if="slotProps.data.gender == 0"> женшина </span>
                    <span v-else>мужчиина</span>
                </template>
            </Column>
            <Column field="actions" header="!!!" style="min-width: 90px">
                <template #body="{data}"> 
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <!-- <template #header>
                <div>Student pagination</div>
            </template> -->
            <template #footer>
                <div>Student pagination</div>
            </template>
        </DataTable>
    </div>
</template>


<style lang="scss">

.student_header {
    display: flex;
    justify-content: start;
}
  .column-text-right {
    .p-column-header-content{
      text-align: center; // or center
      display: block !important;
    }
  }
  .align-right{
  text-align:right;
}
.align-center{
  text-align:center;
}
.p-datatable th[class*="align-"] .p-column-header-content {
  display: inline-flex ;
}
.test_card{
    padding: 1rem;
}
</style>
