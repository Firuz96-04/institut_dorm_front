<script setup>
import {ref, computed, onUnmounted} from 'vue'
import { usePaymentStore } from '@/store/payment';
import {getDate} from '@/helpers/get_date'

const paymentStore = usePaymentStore()

const payFilter = ref({
    end_date: null,
    start_date: null

})

const loading = computed(() => paymentStore.loading)
const payments = computed(() => paymentStore.getAllFilterList)

const searchHandle = () => {
    const st = getDate(payFilter.value.start_date)
    const en =getDate(payFilter.value.end_date)
    paymentStore.payFilterList(
        {
            end_date: en,
            start_date: st
        }
    )
}
onUnmounted(() => {
    paymentStore.filterList = []
})
</script>
<template>
    <div class="card" style="width: 1100px; margin: 0 auto; padding: 1rem;">
     <DataTable :value="payments.results" class="p-datatable-sm" 
            :loading="loading"
            scrollable showGridlines scrollHeight="500px">
            <Column header="#" headerStyle="width:2rem" headerClass="column-text-center" class="text-center">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="student" header="Студент" headerClass="font-semibold column-text-center" class="text-center" style="min-width: 25%">
                <template #body="{ data }">
                    <span class="my_column">{{ data.name }} {{ data.last_name }}</span>
                </template>
            </Column>
            <Column field="amount" headerClass="font-semibold column-text-center" header="Сумма оплаты" class="text-center" style="width: 15%" />
            <Column field="payed_date" headerClass="font-semibold column-text-center" header="Дата оплаты" class="text-center" style="width: 15%" ></Column>
            <Column field="bill" headerClass="font-semibold column-text-center" class="text-center" header="Счет" style="width: 15%" />
            <Column field="comment" headerClass="font-semibold column-text-center" class="text-center" header="Описания" style="width: 30%" />
        
            <template #header>
                <div class="student_header">
                    <div class="student_header__filter">
                        <div class="ml-2">
                            <span class="font-medium">Начало</span>
                            <Calendar class="ml-2 calendar_icon calendar_inp w-10rem" v-model="payFilter.start_date" size="small" showIcon />
                        </div>
                        <div class="ml-2">
                            <span class="font-medium">Конец</span>
                            <Calendar class="ml-2 calendar_icon calendar_inp w-10rem"  v-model="payFilter.end_date" size="small" showIcon />
                        </div>
                    </div>
                    <Button label="Поиск"  @click="searchHandle" class="btn_small" size="small" raised />
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination"></div>
                    <div class="main_footer__export">
                        <!-- <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" /> -->
                    </div>
                </div>
            </template>
            <ColumnGroup type="footer">
                <Row>
                    <Column :colspan="2" footerClass="font-medium text-center" footerStyle="text-align:center">
                        <template #footer>Общая сумма</template>
                    </Column>
                    <Column footerClass="font-medium" footerStyle="text-align:center">
                        <template #footer> {{ payments.total_sum || 0 }} </template>
                    </Column>
                    <Column #footer footerClass="font-medium" footerStyle="text-align:center"/>
                    <Column></Column>
                    <Column></Column>
                </Row>
            </ColumnGroup>
        </DataTable>
        </div>
</template>

<style scoped lang="scss">
.main_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.student_header {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;

    &__filter {
        display: flex;
        justify-content: start;
    }
}
.p-inputtext { 
    padding: 0.5rem !important;
}
</style>