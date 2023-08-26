<script setup>
import { computed } from 'vue';
import { useRoomStore } from '@/store/room';

const roomStore = useRoomStore();
roomStore.setAllRoom();

const rooms = computed(() => roomStore.getAllRoom);
</script>
<template>
    <div class="card">
        <DataTable :value="rooms" class="p-datatable-sm" showGridlines tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" :rowspan="2" />
                    <Column header="Комната" :rowspan="2" />
                    <Column header="Этаж" :rowspan="2" />
                    <Column header="Тип комнаты" :rowspan="2" />
                    <Column header="Здания" :colspan="2" />
                    <Column header="!!!" :rowspan="2" />

                </Row>
                <Row>
                    <Column header="Названия" field="building_name" />
                    <Column header="Этажность" field="building_floor_count" />
                </Row>
            </ColumnGroup>
            <Column headerStyle="width:3rem" style="width: 50px" header="#" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="number" style="min-width: 150px"></Column>
            <Column field="floor" style="min-width: 100px"></Column>
            <Column field="room_type.place" style="min-width: 100px"></Column>
            <Column field="building_name" style="min-width: 150px"></Column>
            <Column field="room_type.place" style="min-width: 100px"></Column>
            <Column field="action" header="!!!" style="min-width: 80px">
                <template #body="slotProps"> <button>22</button> </template>
            </Column>
        </DataTable>
    </div>
</template>
