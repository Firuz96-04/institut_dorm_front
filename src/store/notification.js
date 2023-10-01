import { defineStore } from 'pinia';

export const useNotifyStore = defineStore('notify', {
    state: () => ({
        notifications: [],
        counter: 0,
    }),
    getters: {
        getNotification: (state) => state.notifications
    },
    actions: {

        addNotification(obj) {
            
            // this.notifications.push({id:this.counter+=1 ,status:'severty', message:'sss'});
            this.notifications.push(obj);
            
            setTimeout(() => {
                // console.log();
                this.removeNotification(obj);

                // console.log('message', this.counter);
            }, 5000); // 3000 milliseconds = 3 seconds
        },

        removeNotification(notification) {
            if (this.notifications.length > 0) {
                this.notifications.shift();
              }
            // const index = this.notifications.indexOf(notification)
            // // const index = this.notifications.findIndex((item) => item.id == notification.id);
            // console.log(index, 'index');
            // if (index !== -1) {
            //   this.notifications.splice(index, 1);
            // }
        }
    }


//     <Message v-if="notifications.length" :life="5000" v-for="item in notifications" style="margin-top: 100px" :severity="item.severity">  {{ item.message }} 
// </Message>

});