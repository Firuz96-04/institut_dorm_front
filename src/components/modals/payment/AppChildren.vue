<script setup>
import {ref, defineProps, onMounted, computed} from 'vue'
import { usePaymentStore } from '@/store/payment';


const paymentStore = usePaymentStore()

const props = defineProps({
    book_id: {
        type: Number,
        required: false
    }
})

// const payedStudent = ref([])

paymentStore.findPayment(props.book_id)

const payments = computed(() => paymentStore.getAllPayment)

console.log(payments, 'payments');
</script>

<template>
       <!-- <ProgressSpinner style="width: 35px; height: 35px" strokeWidth="2" fill="var(--surface-ground)" animationDuration="1s" /> -->
    <DataTable :value="payments" tableStyle="min-width: 70rem">
        <Column header="#" headerStyle="width:2rem"  headerClass="column-text-center" class="text-center">
            <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
        </Column>
        <Column field="amount" headerClass="column-text-center" class="text-center" header="Сумма" style="width: 15rem" sortable />
        <Column field="bill" header="Счет" headerClass="column-text-center" class="text-center" style="width: 12rem"/>
        <Column field="payed_date" header="Дата оплаты" headerClass="column-text-center" style="width: 12rem" class="text-center" sortable></Column>
        <Column field="comment" header="Описания"></Column>
        <!-- <Column headerStyle="width:4rem">
            <template #body>
                <Button icon="pi pi-search" />
                s
            </template>
        </Column> -->
    </DataTable>
</template>

<style lang="scss" scoped></style>
