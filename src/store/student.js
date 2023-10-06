import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'
import { useFacultyStore } from './faculty';
import { useCountryStore } from './country';
export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [],
        pagination: [],
        typeStudents: [],
        loading: false
    }),

    getters: {
        getAllStudent: (state) => state.students,
        getStudentType: (state) => state.typeStudents,
        getPagination: (state) => state.pagination
    },

    actions: {
        async setAllStudent(obj) {
            this.loading = true
            const res = await api.get(`/api/student`, {
                params: {...obj}
            });
            const data = await res.data;
            this.students = data.results;
            this.pagination = data.pagination;
            this.loading = false
            // console.log(data);
        },

        async addStudent(obj) {
            try {
                const res = await api.post('/api/student', obj.student);
                const data = await res.data;

                this.setAllStudent({page: 1})
                // this.students.unshift(data);
                obj.cb();
            } catch (error) {
                console.log(error);
            }
        },

        async studentCategory() {
            const facultyStore = useFacultyStore();
            const countryStore = useCountryStore();
            // const typeStore = useStudentTypeStore()
            const res = await http.get('/api/category');
            const json = res.data;
            this.typeStudents = json.data.student_type;
            facultyStore.faculties = json.data.faculty;
            countryStore.countries = json.data.country;
            // typeStore.student_types = json.data.student_type
        },

        
    }
});
