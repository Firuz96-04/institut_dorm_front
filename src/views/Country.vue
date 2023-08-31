<script setup>
import { computed, ref } from 'vue';
import { useCountryStore } from '@/store/country';
import addModal from '@/components/modals/country/addModal.vue'

const countryStore = useCountryStore();
countryStore.countryTotal();

const name = ref('')

const openAdd = ref(false)

const addHandle = () => openAdd.value = true
const countries = computed(() => countryStore.allCountryTotal);
const deleteHandle = () => {

}

const editHandle = (data) => {

}
</script>
<template>
    <div class="card" style="width: 850px; margin: 0 auto">
        <DataTable class="p-datatable-sm" :value="countries" showGridlines tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" :rowspan="2" />
                    <Column header="Страны" :rowspan="3" />
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
                <template #body="slotProps"> {{ slotProps.data.booking_count }} </template>
            </Column>
            <Column field="action" header="!!!" style="width: 80px">
                <template #body="{data}"> 
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle(data)" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
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
                <div>wqaeqweqwe</div>
            </template>
        </DataTable>
    </div>
    <Teleport to="body">
            <addModal :visible="openAdd"  @close="openAdd=false"/>
    </Teleport>
</template>

<style lang="scss" scoped>

.header_block{
    display: flex;
    justify-content: space-between;
}   
</style>
