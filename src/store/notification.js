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


//     <Message v-if="notifications.length" :life="5000" v-for="item in notifications" style="margin-top: 100px" :severity="item.severity">  {{ item.message }} 
// </Message>

});