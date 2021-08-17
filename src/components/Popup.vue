<template>
    <v-div class="text-center" flat>
        <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn flat class="success lighten-4 black--text" v-on="on">
                        <span>add new project</span>
                    </v-btn>
                </template>
                    <v-card> 
                        <v-card-title>
                            <h1>add a new project</h1>
                        </v-card-title>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                                <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>

                                <v-menu max-width="290">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field :rules="inputRules" :value="formattedDate" v-on="on" label="Due date" prepend-icon="mdi-calendar"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="due"></v-date-picker>
                                </v-menu>

                                <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
                            </v-form>
                        </v-card-text>

                    </v-card>
        </v-dialog>
    </v-div>
</template>

<script>
  import moment from 'moment';
  import db from '@/fb';
  export default {
    data () {
      return {
        dialog: false,
        title: '',
        content:'',
        due:null,
        inputRules: [
            v => v.length >= 3 || 'Minimun length is 3 caracters'
        ],
        loading: false,
      }
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()){
                this.loading = true;
                const project = {
                    title: this.title,
                    content: this.content,
                    due: moment(this.due).format("Do MMM YYYY"),
                    person: 'The Net Ninja',
                    status: 'ongoing'
                }
                db.collection('prueba-vue').add(project).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('projectAdded')
                })
            }
        }
    },
    computed: {
        formattedDate() {
            return this.due ? moment(this.due).format("Do MMM YYYY") : ''
        }
    }
  }
</script>