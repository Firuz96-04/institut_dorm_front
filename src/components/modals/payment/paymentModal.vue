<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { usePaymentStore } from '@/store/payment';
import { getDate, getTime, getFull } from '@/helpers/get_date'

const paymentStore = usePaymentStore()
const props = defineProps({
    payment: {
        type: Object,
        requiered: false
    }
});

const emits = defineEmits({
    close: null
})
const closeModal = () => emits('close')
const sana = ref(null)

sana.value = getDate()

const payData = ref({
    amount: 0,
    bill: '',
    comment: ''
})

const addPayment = () => {
    let sanaNew = ''
    // const hour = time.getHours()
    // const minute = time.getMinutes()
    // const soat = time.toLocaleString("en-US", {hour: "numeric", hour12: false })
    // const minut = time.toLocaleString("default", { minute: "2-digit" })

    if (typeof(sana.value) == 'string') {
        sanaNew = sana.value+' '+getTime()
    }
    else {
        sanaNew = getFull(sana.value)
    }

    paymentStore.addPayment({
        payment: {...payData.value, booking: props.payment.book, payed_date: sanaNew },
        cb: closeModal
    })
}


</script>
<template>
    <form @submit.prevent="addPayment">
        <div class="p-fluid">

                <div class="field grid">
                    <label for="student" class="col-12 md:col-2 md:mb-0 font-medium">Студент</label>
                    <div class="col-12 md:col-7 ml-3">
                        <InputText id="student" class="text-lg p-2" v-model="payment.student" disabled size="small" />
                    </div>
                </div>
                <!-- <div class="field grid">
                    <label for="number" class="col-12 md:col-2 md:mb-0 font-medium">Комната</label>
                    <div class="col-12 md:col-5 ml-3">
                        <InputText id="number" class="text-lg text-center p-2 font-medium"  disabled  size="small" />
                    </div>
                </div> -->

                <div class="field grid">
                    <label for="bill" class="col-12 md:col-2 md:mb-0 font-medium">Счет</label>
                    <div class="col-12 md:col-5 ml-3">
                        <InputText id="bill" v-model="payData.bill" class="text-lg text-left p-2 font-medium" :maxlength="15" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="money" class="col-12 md:col-2 md:mb-0 font-medium">Оплата</label>
                    <div class="col-12 md:col-5 ml-3">
                        <InputNumber id="money" inputId="integeronly" v-model="payData.amount"
                            inputClass="text-lg text-center p-2 font-medium" :max="2000000" size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="description" class="col-12 md:col-2 md:mb-0 font-medium">Описания</label>
                    <div class="col-12 md:col-8 ml-3">
                        <InputText id="description" v-model="payData.comment" class="text-lg text-left p-2"  size="small" />
                    </div>
                </div>

                <div class="field grid">
                    <label for="date" class="col-12 md:col-2 md:mb-0 font-medium">Дата</label>
                    <div class="col-12 md:col-4 ml-3">
                        <Calendar id="date" v-model="sana" size="small" inputClass="font-medium" dateFormat="yy-mm-dd"/>
                    </div>
                </div>
                <div class="field grid">
                    <div class="col-12">
                        <Button type="submit" label="Оплатить" class="text-lg p-2" size="small" />
                    </div>
                </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.my_form {
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
</style>
