<script setup>
import { computed, ref } from 'vue';
import { useCountryStore } from '@/store/country';
import addModal from '@/components/modals/country/addModal.vue';
import editModal from '@/components/modals/country/editModal.vue';
import deleteModal from '@/components/modals/country/deleteModal.vue';

const countryStore = useCountryStore();
countryStore.countryTotal();

const name = ref('');

const openAdd = ref(false);
const openEdit = ref(false);
const openDelete = ref(false);

const country = ref(null);
const addHandle = () => (openAdd.value = true);
const countries = computed(() => countryStore.allCountryTotal);

const deleteHandle = (data) => {
    openDelete.value = true
    country.value = data
};

const editHandle = (data) => {
    openEdit.value = true;
    country.value = JSON.parse(JSON.stringify(data));
};
</script>
<template>
    <div class="card" style="width: 850px; margin: 0 auto">
        <DataTable class="p-datatable-sm" :value="countries" scrollable scrollHeight="500px" showGridlines tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" headerClass="column-text-center" :rowspan="2" />
                    <Column :rowspan="3"  headerClass="font-medium column-text-center">
                        <template #header>
                            <div style="display: block; text-align: center; font-size: 16px" >Страны</div>
                        </template>
                    </Column>
                    <Column header="Студенты" class="column-text-center" headerClass="font-medium column-text-center" :colspan="2" />
                    <Column header="!!!" class="column-text-center" :rowspan="2" />
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
            <Column style="width: 250px" field="name" />
            <Column field="student_count" style="width: 150px" class="text-center">
                <template #body="slotProps"> {{ slotProps.data.student_count }} </template>
            </Column>
            <Column field="student_count" style="width: 150px" class="text-center">
                <template #body="slotProps"> {{ slotProps.data.booking_count }} </template>
            </Column>
            <Column field="action" header="!!!" style="width: 80px">
                <template #body="{ data }">
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle(data)" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <ColumnGroup type="footer">
                <Row>
                    <Column :colspan="2" footerClass="font-medium text-center" footerStyle="text-align:center">
                        <template #footer> Общее количество </template>
                    </Column>
                    <Column footerClass="font-medium" footerStyle="text-align:center">
                        <template #footer > xx </template>
                    </Column>
                    <Column #footer footerClass="font-medium" footerStyle="text-align:center">401</Column>
                    <Column></Column>
                </Row>
            </ColumnGroup>
            <template #header>
                <div class="header_block">
                    <div>
                        <InputText v-model="name" type="text" size="small" :maxlength="8" placeholder="Страна" />
                    </div>
                    <div>
                        <Button label="Добавить" @click="addHandle" severity="secondary" size="small" text raised />
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
        <editModal :visible="openEdit" :country_data="country" @close="openEdit = false" />
        <deleteModal :visible="openDelete" :country="country" @close="openDelete = false" />
    </Teleport>
</template>

<style lang="scss" scoped>
.header_block {
    display: flex;
    justify-content: space-between;
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
</style>
