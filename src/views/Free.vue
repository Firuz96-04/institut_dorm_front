<script setup>
import { computed, ref } from 'vue';
import { useFreePlaceStore } from '@/store/free_place';
import { useBuildingStore } from '@/store/building';
import freeModal from '@/components/modals/free/freeModal.vue';
import showTenat from '@/components/modals/free/showTenat.vue'
const freeStore = useFreePlaceStore();
const buildStore = useBuildingStore();
const floors = ref([]);
const floor_state = ref(true);


buildStore.setAllBuilding()

const free_places = computed(() => freeStore.getAllFreePlace);
const pagination = computed(() => freeStore.getPagination);
const buildings = computed(() => buildStore.allBuilding);
const loading = computed(() => freeStore.loading)

const selectedProduct = ref([])
let timeout;
const freeFilter = ref({
    building: null,
    floor: null,
    is_full: null,
    place: null,
    room: null,
    gender: null,
    page: null
});

const status_list = ref([
    { name: 'свободные', code: 0 },
    { name: 'занятие', code: 1 }
]);


const roomGenderList = [
    {name:'женские', code: 0},
    {name:'мужские', code: 1},
    {name:'незаселенные', code: 2},
]

const free_place = ref([
    { name: '1', code: 1 },
    { name: '2', code: 2 },
    { name: '3', code: 3 },
    { name: '4', code: 4 }
]);
const freeData = ref({});
freeStore.setAllFreePlace();

const visible = ref(false);
const openShow = ref(false)
const buildHandle = (e) => {
    if (e.value) {
        console.log(e.value);
        floor_state.value = false;
        const build = buildings.value.filter((item) => item.id == e.value);
        const res = JSON.parse(JSON.stringify(build));
        const floor = res[0].floor_count;
        freeStore.setAllFreePlace(freeFilter.value);
        floors.value = [];
        for (let i = 1; i <= floor; i++) {
            floors.value.push({ name: i, code: i });
        }
    } else {
        freeFilter.value.floor = null;
        floor_state.value = true;
        freeStore.setAllFreePlace(freeFilter.value);
    }
};

const filterHandle = (e) => {
    freeStore.setAllFreePlace(freeFilter.value);
};

const searchRoom = (e) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    timeout = setTimeout(() => {
        freeStore.setAllFreePlace(freeFilter.value);
    }, 500);
};

const freePlace = (obj) => {
    freeData.value = JSON.parse(JSON.stringify(obj));
    visible.value = true;
};

const paginateHandle = (data) => {
    // console.log(data, 'data');
     freeFilter.value.page = data.page + 1
     freeStore.setAllFreePlace(freeFilter.value);
};

const close = () => {
    visible.value = false;
    openShow.value = false
};

const checkRoomGender = (data) => {
    const room = JSON.parse(JSON.stringify(data))
    switch (room.room_gender) {
        case '0':
        return { background: '#ffc8dd' };
        case '1':
        return { background: '#bde0fe' };
        
        default:
        return {  };
    }
}

const handleRow = (event) => {
    const column = event.originalEvent.target.textContent;

    if(column != '') {
        const {data} = event
        if (data.person_count > 0) {
        openShow.value = true
      }
    }
}


</script>
<template>
    <div class="card" style="padding: 1rem">
        <DataTable :value="free_places" v-model:selection="selectedProduct" scrollable  tableStyleClass="red-bottom-border"
        :loading="loading" scrollHeight="calc(100vh - 250px)" 
        class="p-datatable-sm my-table"
        :rowStyle="checkRoomGender" @row-click="handleRow" showGridlines tableStyle="min-width: 40rem red-bottom-border">
            <Column header="#" headerStyle="width:3rem" class="column-text-center text-center" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column selectionMode="multiple" class="column-text-center text-center" @click.stop headerStyle="width: 3rem">
                <!-- <template #body="slotProps">
                    
                </template> -->
            </Column>
            <Column field="building" header="Здания" headerClass="font-semibold column-text-center" style="min-width: 150px"></Column>
            <Column field="number" headerClass="font-semibold" class="column-text-center text-center" header="Комната" style="min-width: 60px"></Column>
            <Column field="floor" headerClass="font-semibold" class="column-text-center text-center" header="Этаж" style="min-width: 50px"></Column>
            <Column field="room_place" headerClass="font-semibold" class="column-text-center text-center" header="Тип комнаты" style="min-width: 100px"></Column>

            <Column field="person_count" headerClass="font-semibold" class="column-text-center text-center" header="Кол. проживаюших" style="min-width: 100px"></Column>
            <Column field="free_place" headerClass="font-semibold" class="column-text-center text-center" header="Свободные места" bodyClass="text-center" style="min-width: 100px"></Column>
            <Column field="action" header="!!!" headerClass="column-text-center" style="min-width: 100px; text-align: center">
                <template #body="{ data }">
                    <!-- <Button size="small" label="Success" severity="success" raised /> -->
                    <!-- <Button v-if="data.is_full" label="занято"  text  raised  class="my_btn" /> -->
                    <Button v-if="data.is_full" label="занято" severity="danger" raised class="my_btn" />
                    <Button v-else label="свободно" @click="freePlace(data)" severity="success" class="my_btn" raised />
                </template>
            </Column>
            <template #header>
                <div class="my_filter">
                    <Dropdown
                        v-model="freeFilter.building"
                        showClear
                        @change="buildHandle"
                        optionLabel="name"
                        optionValue="code"
                        :options="buildings.map((item) => ({ name: item.name, code: item.id }))"
                        placeholder="Здания"
                        class="p-inputtext-sm w-full md:w-12rem "
                    />
                    <Dropdown v-model="freeFilter.floor" showClear @change="filterHandle" optionValue="code" 
                    :disabled="floor_state" :options="floors" optionLabel="name" 
                    class="p-inputtext-sm w-full md:w-8rem" placeholder="Этаж"></Dropdown>
                    <Dropdown v-model="freeFilter.is_full" showClear @change="filterHandle" optionValue="code" 
                    :options="status_list" optionLabel="name" class="p-inputtext-sm w-full md:w-10rem" placeholder="Статус"></Dropdown>
                    <Dropdown v-model="freeFilter.place" showClear @change="filterHandle" optionValue="code" 
                    :options="free_place" optionLabel="name" class="p-inputtext-sm w-full md:w-10rem" placeholder="Кол. мест"></Dropdown>
                  
                    <Dropdown v-model="freeFilter.gender" showClear @change="filterHandle" optionValue="code" 
                    :options="roomGenderList" optionLabel="name" class="p-inputtext-sm w-full md:w-14rem" placeholder="тип комнаты"></Dropdown>
                 <!-- <InputText type="search" v-model="freeFilter.room"  @update:modelValue="searchRoom" placeholder="Комнаты" 
                        class="p-inputtext-sm w-full md:w-8rem" :maxlength="4" :clearable="true" /> -->
                </div>

                
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination">
                        <Paginator class="custom_pagination" @page="paginateHandle" :rows="pagination.page_size" :totalRecords="pagination.total"></Paginator>
                    </div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template>
        </DataTable>
        <Teleport to="body">
            <freeModal @close="close" :visible="visible" :data="freeData"></freeModal>
            <showTenat @close="close" :visible="openShow" :room="{}"/>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>

.my_border {
.p-table .p-datatable-wrapper {
  border: 2px solid rgb(0, 255, 38) !important/* замените "red" на нужный цвет */
}
}
// .p-inputtext {
//   font-size: 1rem !important;
// }
.red-bottom-border {
    border-bottom: 3px solid red !important;
}
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

.my_filter {
    display: flex;
    justify-content: start;

    .p-dropdown {
        margin-right: 15px;
    }
}
.my_card {
    padding: 1rem;
}

.my_btn {
    padding: 4px 8px;
    width: 90px;
    // color: #d123b4 !important;
    font-size: 12px;
    // background-color: rgb(183, 238, 170) !important;
    border: none;

    // &:hover {
    //     background-color: #b93c3c !important;
    // }
}

// .column-text-center {
//     .p-column-header-content {
//         text-align: center; // or center
//         display: block !important;
//     }
// }

//   .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td

</style>
