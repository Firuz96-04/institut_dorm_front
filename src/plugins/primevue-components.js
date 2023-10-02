import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Menu from 'primevue/menu';
import Message from 'primevue/message';
import Paginator from 'primevue/paginator';
import Password from 'primevue/password';
import Row from 'primevue/row';
import Sidebar from 'primevue/sidebar';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';

export default {
    install(app) {
        app.use(PrimeVue, { ripple: true });
        app.use(ToastService);
        app.use(DialogService);
        
        app.directive('badge', BadgeDirective);
        app.directive('styleclass', StyleClass);
        app.component('Avatar', Avatar);
        app.component('Button', Button);
        app.component('Calendar', Calendar);
        app.component('Card', Card);       
        app.component('Checkbox', Checkbox);
        app.component('Column', Column);
        app.component('ColumnGroup', ColumnGroup);
        app.component('ConfirmDialog', ConfirmDialog);
        app.component('DataTable', DataTable);
        app.component('Dialog', Dialog);
        app.component('Dropdown', Dropdown);
        app.component('FileUpload', FileUpload);
        app.component('Image', Image);
        app.component('InlineMessage', InlineMessage);
        app.component('InputMask', InputMask);
        app.component('InputNumber', InputNumber);
        app.component('InputText', InputText);
        app.component('Menu', Menu);
        app.component('Message', Message);
        app.component('Paginator', Paginator);
        app.component('Password', Password);
        app.component('Row', Row);
        app.component('Sidebar', Sidebar);
        app.component('Textarea', Textarea);
        app.component('Toast', Toast);
        app.component('ProgressSpinner', ProgressSpinner)
    },
  };