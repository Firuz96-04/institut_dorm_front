<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();


const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
};

const showInfo = () => {
    toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Detail', life: 3000 });
};

const showWarn = () => {
    toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
};

const showError = () => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Detail', life: 3000 });
};
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6">
            <div class="card">
                <h5>Toast</h5>

                <Toast />
                <Button @click="showSuccess()" label="Success" class="p-button-success mr-2" />
                <Button @click="showInfo()" label="Info" class="p-button-info mr-2" />
                <Button @click="showWarn()" label="Warn" class="p-button-warning mr-2" />
                <Button @click="showError()" label="Error" class="p-button-danger mr-2" />
            </div>
        </div>


        <!-- <div class="col-12 lg:col-4">
            <div class="card">
                <h5>Help Text</h5>
                <div class="field p-fluid">
                    <label for="username2">Username</label>
                    <InputText id="username2" type="username" class="p-error" aria-describedby="username-help" />
                    <small id="username-help" class="p-error">Enter your username to reset your password.</small>
                </div>
            </div>
        </div> -->
    </div>
</template>
