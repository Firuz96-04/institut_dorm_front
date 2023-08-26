<script setup>
import { computed } from 'vue';
import { useFacultyStore } from '@/store/faculty';

const facultyStore = useFacultyStore();
facultyStore.facultyTotal();

const show = () => {
    console.log('kkk');
}
const faculties = computed(() => facultyStore.allFacultyTotal);
</script>
<template>
    <div class="card" style="width: 850px; margin: 0 auto">
        <DataTable class="p-datatable-sm" :value="faculties" showGridlines tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Products</span>
                    <Button icon="pi pi-refresh" rounded raised />
                </div>
            </template>
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" :rowspan="2" />
                    <Column :rowspan="3">
                        <template #header>
                            <div style="display: block; text-align: center; color: #e42626; font-size: 18px">Факультет</div>
                        </template>
                    </Column>
                    <Column header="Студенты" :colspan="2" />
                    <Column header="!!!" :rowspan="2" />
                </Row>
                <Row>
                    <Column header="Кол. студентов" field="student_count" style="width: 150px" />
                    <Column header="Заселены" field="booking_count" style="width: 150px" />
                </Row>
            </ColumnGroup>
            <Column headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column style="width: 250px" field="name" />
            <Column field="student_count" style="width: 150px">
                <template #body="slotProps"> {{ slotProps.data.student_count }} </template>
            </Column>
            <Column field="student_count" style="width: 150px">
                <template #body="slotProps" @click="show"> {{ slotProps.data.booking_count }} </template>
            </Column>
            <Column field="action" header="!!!" style="width: 80px">
                <template #body="slotProps"> <button>22</button> </template>
            </Column>

            <ColumnGroup type="footer">
                <Row>
                    <Column :colspan="2" footerStyle="text-align:center">
                        <template #body> ssss </template>
                    </Column>
                    <Column />
                    <Column />
                    <Column />
                </Row>
            </ColumnGroup>
            <template #footer>
                <div>wqaeqweqwe</div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>
.p-datatable .p-column-header-content {
    align-items: center !important;
}
tbody tr:hover {
  background-color: #74b13f;/* Change to your preferred color */
  cursor: pointer;
}
</style>
