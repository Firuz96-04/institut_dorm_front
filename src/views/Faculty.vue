<script setup>
import { computed, ref } from 'vue';
import { useFacultyStore } from '@/store/faculty';
import addModal from '@/components/modals/faculty/addModal.vue';
import editModal from '@/components/modals/faculty/editModal.vue';
import deleteModal from '@/components/modals/faculty/deleteModal.vue';

const facultyStore = useFacultyStore();
facultyStore.facultyTotal();

const show = () => {
    console.log('kkk');
};

const faculty = ref({});

const faculties = computed(() => facultyStore.allFacultyTotal);
const name = ref();

const openAdd = ref(false);
const openEdit = ref(false);
const openDelete = ref(false);

const addHandle = () => (openAdd.value = true);
const editHandle = (data) => {
    faculty.value = JSON.parse(JSON.stringify(data));
    openEdit.value = true;
};

const deleteHandle = (data) => {
    faculty.value = data;
    openDelete.value = true;
};
</script>
<template>
    <div class="card" style="width: 850px; margin: 0 auto">
        <DataTable class="p-datatable-sm" :value="faculties" scrollable scrollHeight="400px" showGridlines tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" headerClass="column-text-center" :rowspan="2" />
                    <Column :rowspan="3" class="column-text-center" headerClass="font-medium">
                        <template #header>
                            <div style="display: block; text-align: center; font-size: 16px">Факультет</div>
                        </template>
                    </Column>
                    <Column header="Студенты" :colspan="2" headerClass="font-medium column-text-center" />
                    <Column header="!!!" :rowspan="2" headerClass="font-medium column-text-center" />
                </Row>
                <Row>
                    <Column header="Кол. студентов" field="student_count" headerClass="font-medium column-text-center" style="width: 150px" />
                    <Column header="Заселены" field="booking_count" headerClass="font-medium column-text-center" style="width: 150px" />
                </Row>
            </ColumnGroup>
            <Column headerStyle="width:3rem" class="column-text-center text-center">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column style="width: 250px" headerClass="font-normal column-text-center" field="name" />
            <Column field="student_count" style="width: 150px" class="text-center">
                <template #body="slotProps"> {{ slotProps.data.student_count }} </template>
            </Column>
            <Column field="student_count" style="width: 150px" class="text-center">
                <template #body="slotProps" @click="show"> {{ slotProps.data.booking_count }} </template>
            </Column>
            <Column field="action" headerClass="column-text-right" header="!!!" style="width: 80px">
                <template #body="{ data }">
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle(data)" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <ColumnGroup type="footer">
                <Row>
                    <Column :colspan="2" footerClass="font-medium font-normal" footerStyle="text-align:center">
                        <template #footer> Общее количество </template>
                    </Column>
                    <Column footerClass="font-medium font-normal" footerStyle="text-align:center">
                        <template #footer> {{ facultyStore.total.student_total }} </template>
                    </Column>
                    <Column #footer footerClass="font-medium font-normal" footerStyle="text-align:center">{{ facultyStore.total.book_total }}</Column>
                    <Column></Column>
                </Row>
            </ColumnGroup>
            <template #header>
                <div class="header_block">
                    <div>
                        <InputText v-model="name" class="my_input" type="search" size="small" :maxlength="10" placeholder="Факультет" />
                    </div>
                    <div>
                        <Button label="Добавить" @click="addHandle" size="small" raised />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination"></div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
    <Teleport to="body">
        <addModal :visible="openAdd" @close="openAdd = false" />
        <editModal :visible="openEdit" :item="faculty" @close="openEdit = false" />
        <deleteModal :visible="openDelete" :faculty="faculty" @close="openDelete = false" />
    </Teleport>
</template>

<style lang="scss" scoped>
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

.p-datatable .p-column-header-content {
    align-items: center !important;
}
tbody tr:hover {
    background-color: #74b13f; /* Change to your preferred color */
    cursor: pointer;
}

.header_block {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.column-text-center {
    .p-column-header-content {
        text-align: center; // or center
        display: block !important;
    }
}
</style>
