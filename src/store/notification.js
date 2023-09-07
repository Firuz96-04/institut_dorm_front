import { defineStore } from 'pinia';

export const useNotifyStore = defineStore('notify', {
    state: () => ({
        notifications: [],
    }),
    getters: {
        getNotification: (state) => state.notifications
    },
    actions: {

        addNotification(obj) {
            this.notifications.push(obj);
            setTimeout(() => {
                this.removeNotification(obj);
            }, 5000); // 3000 milliseconds = 3 seconds
        },

        removeNotification(notification) {
            const index = this.notifications.indexOf(notification);
            if (index !== -1) {
              this.notifications.splice(index, 1);
            }
        }
    }


});