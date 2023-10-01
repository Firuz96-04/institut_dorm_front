<script setup>
import {ref, computed} from 'vue'
import { usePriviligeStore } from '@/store/privilige';
import addModal from '@/components/modals/privilige/addModal.vue'
import editModal from '@/components/modals/privilige/editModal.vue'
import deleteModal from '@/components/modals/privilige/deleteModal.vue'

const priviligeStore = usePriviligeStore();
priviligeStore.setAllPrivilige();

const priviliges = computed(() => priviligeStore.getAllPrivilige)

const openAdd = ref(false)
const openEdit = ref(false)
const openDelete = ref(false)

const privilige = ref({})

const editHandle = (data) => {
    const parse = JSON.parse(JSON.stringify(data))
    privilige.value = parse
    openEdit.value = true
}

const deleteHandle = (data) => {
    const parse = JSON.parse(JSON.stringify(data))
    privilige.value = parse
    openDelete.value = true
}

const addHandle = () => {
    openAdd.value = true
}

</script>
<template>
<div class="card my_table">
        <DataTable :value="priviliges" class="p-datatable-sm" showGridlines scrollable scrollHeight="400px">
            <Column header="#" headerStyle="width:4rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" headerClass="font-semibold column-text-center" header="Названия" style="width: 30%" ></Column>
            
            <Column field="description" headerClass="font-semibold column-text-center" header="Описания" style="width: 60%"></Column>
            <Column field="actions" header="!!!" headerClass="column-text-center" style="width: 10%">
                <template #body="{ data }">
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle(data)" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <template #header>
                <div class="student_header">
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
        <editModal :visible="openEdit" :privilige="privilige" @close="openEdit = false" />
        <deleteModal :visible="openDelete" :privilige="privilige" @close="openDelete = false" /> 
    </Teleport>
</template>

<style lang="scss" scoped>

.student_header {
    display: flex;
    justify-content: end;

}
.my_table {
    width: 1000px;
    margin: 0 auto;
    padding: 1rem;
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