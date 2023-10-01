<script setup>
import { computed, ref } from 'vue';
import { useBookingStore } from '@/store/booking';
import bookModal from '@/components/modals/tenat/bookModal.vue'
import paymentModal from '@/components/modals/payment/paymentModal.vue'
import AppChildren from '@/components/modals/payment/AppChildren.vue'
const bookStore = useBookingStore();

bookStore.setAllBooking();

const tenats = computed(() => bookStore.getAllBookings);
const pagination = computed(() => bookStore.getAllPaginations);
const loading = computed(() => bookStore.loading)

let timeout = null
const expandedRows = ref([])

const debtor = ref([
    {code:1, name:'оплаченные'},
    {code:2, name:'не оплаченные'},
])

const privileges = ref([
    {code:1, name:'без привилегии'},
    {code:2, name:'привилегии'},
])

const tenat_filter = ref({
    search: null,
    debt: null,
    privilege: null,
    page: null
})

const payment = ref(null)

const visible = ref(false)
const paymentOpen = ref(false)
const close = () => {
    visible.value = false
}

const paginateHandle = (data) => {
    console.log(data, 'data');
    tenat_filter.value.page = data.page + 1
    bookStore.setAllBooking(tenat_filter.value);
}

const showTenat = (event) => {
    const column = event.originalEvent.target.textContent;
    const {debt} = event.data
    console.log(debt, 'debt');
    if(column != '') {
        const {data} = event
        const {id, student, room} = JSON.parse(JSON.stringify(data))
        const {full_name} = student
        payment.value = {book: id, room: room, student: full_name }
        paymentOpen.value = true  
    }
    else {
        // alert('Этот студент уже оплатиль')
    }
    
}

const onRowExpand = (data) => {
    if (expandedRows.value.length > 1) {
        expandedRows.value.splice(0,1)
    }
}

const my_style = (data) => {
    const {privilege} = data
    if (privilege) {
        return { background: '#f7b267' };
    }
    else {
        return { };
    }
}

const filterHandle = () => { 
    tenat_filter.value.page = 1
    bookStore.setAllBooking(tenat_filter.value);
}

const searchStudent = (e) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    timeout = setTimeout(() => {
        bookStore.setAllBooking(tenat_filter.value);
    }, 500);
};


</script>

<template>
    <div class="card" style="padding: 1rem;">
        <DataTable :value="tenats" class="p-datatable-sm" scrollable scrollHeight="calc(100vh - 250px)" 
            :loading="loading" showGridlines tableStyle="min-width: 50rem" @row-click="showTenat"
            v-model:expandedRows="expandedRows"
            @rowExpand="onRowExpand"
            :rowStyle="my_style"
            >
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" headerStyle="width:3rem" frozen :rowspan="2"/>
                    <Column style="width: 5rem" frozen :rowspan="2" />
                    <Column header="Студент" class="font-semibold column-text-center" :colspan="6" frozen/>
                    <Column header="Стоимость проживания" headerClass="font-semibold column-text-center" :colspan="3" />
                    <Column header="Место проживания" headerClass="font-semibold column-text-center" :colspan="3" />
                    <Column header="Дата проживания" headerClass="font-semibold column-text-center" :colspan="2" />
                </Row>
                <Row>
                    <Column header="Студент" headerClass="font-semibold column-text-center" field="full_name" />
                    <Column header="Страна" headerClass="font-semibold column-text-center" field="country" />
                    <Column header="Факультет" headerClass="font-semibold column-text-center" field="faculty" />
                    <Column header="Курс" headerClass="font-semibold column-text-center" field="course" />
                    <Column header="Пол" headerClass="font-semibold column-text-center" field="gender" />
                    <Column header="Тип" headerClass="font-semibold column-text-center" field="student_type" />

                    <Column header="Стоимость" headerClass="font-semibold column-text-center" field="total_price"/>
                    <Column header="Оплатил" headerClass="font-semibold column-text-center" field="payed" />
                    <Column header="Долг" headerClass="font-semibold column-text-center" field="debt" />

                    <Column header="Здания" headerClass="font-semibold column-text-center" field="building" />
                    <Column header="Комната" headerClass="font-semibold column-text-center" field="number" />
                    <Column header="Этаж" headerClass="font-semibold column-text-center" field="floor" />

                    <Column header="Начало" headerClass="font-semibold column-text-center" field="book_date" />
                    <Column header="Конец" headerClass="font-semibold column-text-center" field="book_end" />
                </Row>
            </ColumnGroup>

            <Column headerStyle="width:3rem" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column class="p-1" expander frozen />
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
                    <span v-else>мужчина</span>
                </template>
            </Column>
            <Column field="student.student_type" style="min-width: 70px" class="text-center" />
            <Column  field="total_price" style="min-width: 120px; text-align: center"
                        :style="{'background-color': 15 == '0.00' ? 'yellow' : 'none'}"
                    />
            <Column field="payed" style="min-width: 120px; text-align: center" />
            <Column field="debt" style="min-width: 120px; text-align: center" />

            <Column field="room.building" style="min-width: 150px" class="text-center" />
            <Column field="room.number" style="min-width: 100px" class="text-center" />
            <Column field="room.floor" style="min-width: 100px" class="text-center" />

            <Column field="book_date" style="min-width: 100px; text-align: center;"/>
            <Column field="book_end" style="min-width: 100px; text-align: center;"/>
            <template #header>
                <div class="student_header">
                    <div class="student_header__filter">
                        <InputText v-model="tenat_filter.search" @update:modelValue="searchStudent"
                             type="search" class="my_input" placeholder="студент" />
                        <Dropdown showClear v-model="tenat_filter.debt" @change="filterHandle" class="st_select ml-4 md:w-14rem" :options="debtor" 
                            optionLabel="name" optionValue="code" placeholder="долг" size="small" />
                        <Dropdown showClear class="st_select ml-4 md:w-14rem" v-model="tenat_filter.privilege" :options="privileges" @change="filterHandle"
                            optionLabel="name" optionValue="code" placeholder="привилегия" size="small" />
                    </div>
                    <div class="">
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination">
                        <Paginator 
                            :alwaysShow="false" 
                            class="custom_pagination" 
                            @page="paginateHandle" 
                            :rows="pagination.page_size"
                            :v-model="2"
                            :totalRecords="pagination.total"></Paginator>        
                    </div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template> 

            <template #expansion="{data}">
                <div class="flex align-items-start align-items-start" >
                     <AppChildren :book_id="data.id"/>
                </div>
            </template>

        </DataTable>

    </div>
    <Teleport to="body">
        <bookModal @close="close" :visible="visible"></bookModal>
        <Dialog v-model:visible="paymentOpen" modal header="Оплаты" :style="{ width: '30vw' }">
                <paymentModal :payment="payment" @close="paymentOpen=false"/>
        </Dialog>
    </Teleport>
</template>

<style lang="scss" scoped>

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
