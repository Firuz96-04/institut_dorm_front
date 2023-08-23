<script setup>
import { computed } from 'vue';
import { useCountryStore } from '@/store/country';

const countryStore = useCountryStore();
countryStore.countryTotal();

const show = () => {
    console.log('ffff');
}
const countries = computed(() => countryStore.allCountryTotal);

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

<style scoped></style>
