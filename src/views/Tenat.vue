<template>
    <div class="card flex justify-content-center">
        <Button type="button" label="Toggle" @click="toggle" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        <Toast />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    console.log('message');
                    toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                }
            }
        ]
    },
   
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const save = () => {
    toast.add({severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000});
};
</script>