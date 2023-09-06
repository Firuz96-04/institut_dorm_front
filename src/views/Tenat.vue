<script setup>
import { computed, ref } from 'vue';
import { useBookingStore } from '@/store/booking';
import bookModal from '@/components/modals/tenat/bookModal.vue'

const bookStore = useBookingStore();
bookStore.setAllBooking();

const tenats = computed(() => bookStore.getAllBookings);
const pagination = computed(() => bookStore.getAllPaginations);

const tenat_filter = ref({
    search: null
})

const visible = ref(false)

const close = () => {
    visible.value = false
}

const paginateHandle = (data) => {
    console.log(data, 'pagination');
}
</script>

<template>
    <div class="card" style="padding: 1rem;">
        <DataTable :value="tenats" class="p-datatable-sm" scrollHeight="500px" scrollable showGridlines tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" frozen :rowspan="2"/>
                    <Column header="Студент" class="font-semibold column-text-center" :colspan="5" frozen/>
                    <Column header="Место проживания" headerClass="font-semibold column-text-center" :colspan="3" />
                    <Column header="Стоимость проживания" headerClass="font-semibold column-text-center" :colspan="3" />
                    <Column header="Дата проживания" headerClass="font-semibold column-text-center" :colspan="2" />
                </Row>
                <Row>
                    <Column header="Студент" headerClass="font-semibold column-text-center" field="full_name" />
                    <Column header="Страна" headerClass="font-semibold column-text-center" field="country" />
                    <Column header="Факультет" headerClass="font-semibold column-text-center" field="faculty" />
                    <Column header="Курс" headerClass="font-semibold column-text-center" field="course" />
                    <Column header="Пол" headerClass="font-semibold column-text-center" field="gender" />
                    
                    <Column header="Здания" headerClass="font-semibold column-text-center" field="building" />
                    <Column header="Комната" headerClass="font-semibold column-text-center" field="number" />
                    <Column header="Этаж" headerClass="font-semibold column-text-center" field="floor" />

                    <Column header="Стоимость" headerClass="font-semibold column-text-center" field="total_price" />
                    <Column header="Оплатил" headerClass="font-semibold column-text-center" field="payed" />
                    <Column header="Долг" headerClass="font-semibold column-text-center" field="debt" />

                    <Column header="Начало" headerClass="font-semibold column-text-center" field="book_date" />
                    <Column header="Конец" headerClass="font-semibold column-text-center" field="book_end" />
                </Row>
            </ColumnGroup>
            <Column headerStyle="width:3rem" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="full_name" style="min-width: 220px;" frozen>
                <template #body="{ data }"> {{ data.student.full_name }} </template>
            </Column>
            <Column field="country" style="min-width: 170px" >
                <template #body="{ data }"> {{ data.student.country.name }} </template>
            </Column>
            <Column field="faculty" style="min-width: 170px">
                <template #body="{ data }"> {{ data.student.faculty.name }} </template>
            </Column>
            <Column field="student.course" style="min-width: 70px" class="text-center" />
            <Column field="student.gender" style="min-width: 100px" class="text-center">
                <template #body="{ data }">
                    <span v-if="data.student.gender == 0"> женшина </span>
                    <span v-else>мужчиина</span>
                </template>
            </Column>
            <Column field="room.building" style="min-width: 150px" class="text-center" />
            <Column field="room.number" style="min-width: 100px" class="text-center" />
            <Column field="room.floor" style="min-width: 100px" class="text-center" />

            <Column field="total_price" style="min-width: 120px; text-align: center" />
            <Column field="payed" style="min-width: 120px; text-align: center" />
            <Column field="debt" style="min-width: 120px; text-align: center" />

            <Column field="book_date" style="min-width: 100px; text-align: center;"/>
            <Column field="book_end" style="min-width: 100px; text-align: center;"/>
            <template #header>
                <div class="student_header">
                    <div class="student_header__filter">
                        <InputText v-model="tenat_filter.search" type="search" class="my_input" placeholder="студент" />
                    </div>
                    <div class="">
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination">
                        <!-- {{ pagination }} -->
                        <Paginator v-if="pagination.next" class="custom_pagination" @page="paginateHandle" :rows="pagination.total" :totalRecords="pagination.size"></Paginator>
                    </div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template>
        </DataTable>

    </div>
<Teleport to="body">
    <bookModal  @close="close"  :visible="visible"></bookModal>
</Teleport>
</template>

<style lang="scss">
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
</style>
