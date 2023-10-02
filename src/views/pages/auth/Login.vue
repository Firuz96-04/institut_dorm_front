<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import {useAuthStore} from '@/store/auth'
import {useRouter} from 'vue-router'
const { layoutConfig } = useLayout();
const user = ref({
    email: null,
    password: null
})

const router = useRouter()
const authStore = useAuthStore()

const email = ref('');
const password = ref('');
const checked = ref(false);

const loading = ref(false)

// const logoUrl = computed(() => {
//     return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });

const handleLogin = () => {
    loading.value = true
    // console.log(user.value.email && user.value.password, 'check');
    authStore.login(user.value).then(
        () => {
            router.push('/')
        },
        error => {
            loading.value = false
            console.log('message', error);
        }
    ).catch(err => {
            console.log(err, 'catch ccccccccc');
    })
}
authStore.loggedIn ? router.push('/') : false

console.log(authStore.loggedIn);
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-5 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <span class="text-600 font-medium">Войдите, чтобы продолжить</span>
                    </div>

                    <form @submit.prevent="handleLogin">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="search" placeholder="Email адрес" class="w-full md:w-25rem mb-5 font-medium text-lg" 
                            :maxlength="30"
                         v-model="user.email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                        <Password id="password1" v-model="user.password" :maxlength="20" placeholder="Пароль"
                         :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full font-medium text-lg" />

                        <!-- <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div> -->
                        <Button label="Войти" type="submit" :loading="loading" class="w-full p-3 text-xl"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
