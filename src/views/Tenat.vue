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
                    <Column header="Студент" :colspan="5"/>
                    <Column header="Место проживания" :colspan="3" />
                    <Column header="Стоимость проживания" :colspan="3" />
                    <Column header="Дата проживания" :colspan="2" />
                </Row>
                <Row>
                    <Column header="Студент" field="full_name" frozen/>
                    <Column header="Страна" field="country" />
                    <Column header="Факультет" field="faculty" />
                    <Column header="Курс" field="course" />
                    <Column header="Пол" field="gender" />
                    
                    <Column header="Здания" field="building" />
                    <Column header="Комната" field="number" />
                    <Column header="Этаж" field="floor" />

                    <Column header="Стоимость" field="total_price" />
                    <Column header="Оплатил" field="payed" />
                    <Column header="Долг" field="debt" />

                    <Column header="Начало" field="book_date" />
                    <Column header="Конец" field="book_end" />
                </Row>
            </ColumnGroup>
            <Column headerStyle="width:3rem" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="full_name" style="min-width: 220px" frozen>
                <template #body="{ data }"> {{ data.student.full_name }} </template>
            </Column>
            <Column field="country" style="min-width: 170px">
                <template #body="{ data }"> {{ data.student.country.name }} </template>
            </Column>
            <Column field="faculty" style="min-width: 170px">
                <template #body="{ data }"> {{ data.student.faculty.name }} </template>
            </Column>
            <Column field="student.course" style="min-width: 70px" />
            <Column field="student.gender" style="min-width: 100px">
                <template #body="{ data }">
                    <span v-if="data.student.gender == 0"> женшина </span>
                    <span v-else>мужчиина</span>
                </template>
            </Column>
            <Column field="room.building" style="min-width: 150px" />
            <Column field="room.number" style="min-width: 100px" />
            <Column field="room.floor"  style="min-width: 100px"/>

            <Column field="total_price" style="min-width: 120px"/>
            <Column field="payed" style="min-width: 120px"/>
            <Column field="debt" style="min-width: 120px"/>

            <Column field="book_date" style="min-width: 100px"/>
            <Column field="book_end" style="min-width: 100px"/>
        </DataTable>
    </div>
<Teleport to="body">
    <bookModal  @close="close"  :visible="visible"></bookModal>
</Teleport>
</template>
