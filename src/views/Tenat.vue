<script setup>
import { computed, ref } from 'vue';
import { useBookingStore } from '@/store/booking';
import bookModal from '@/components/modals/tenat/bookModal.vue'

const bookStore = useBookingStore();
bookStore.setAllBooking();

const tenats = computed(() => bookStore.getAllBookings);
const visible = ref(false)
const show = () => {
    visible.value = true
}
const close = () => {
    visible.value = false
}
</script>

<template>
    <button @click="show">show</button>
    <div class="card">
        <DataTable :value="tenats" class="p-datatable-sm" scrollable showGridlines tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" frozen :rowspan="2"/>
                    <Column header="Студент" class="column-text-center" :colspan="5" frozen/>
                    <Column header="Место проживания" class="column-text-center" :colspan="3" />
                    <Column header="Стоимость проживания" class="column-text-center" :colspan="3" />
                    <Column header="Дата проживания" class="column-text-center" :colspan="2" />
                </Row>
                <Row>
                    <Column header="Студент" class="column-text-center" field="full_name" />
                    <Column header="Страна" class="column-text-center" field="country" />
                    <Column header="Факультет" class="column-text-center" field="faculty" />
                    <Column header="Курс" class="column-text-center" field="course" />
                    <Column header="Пол" class="column-text-center" field="gender" />
                    
                    <Column header="Здания" class="column-text-center" field="building" />
                    <Column header="Комната" class="column-text-center" field="number" />
                    <Column header="Этаж" class="column-text-center" field="floor" />

                    <Column header="Стоимость" class="column-text-center" field="total_price" />
                    <Column header="Оплатил" class="column-text-center" field="payed" />
                    <Column header="Долг" class="column-text-center" field="debt" />

                    <Column header="Начало" class="column-text-center" field="book_date" />
                    <Column header="Конец" class="column-text-center" field="book_end" />
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
        </DataTable>
    </div>
<Teleport to="body">
    <bookModal  @close="close"  :visible="visible"></bookModal>
</Teleport>
</template>
