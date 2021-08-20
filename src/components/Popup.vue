<template>
    <v-div class="text-center" flat>
        <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn depressed class="grey lighten-4 black--text" v-on="on">
                        <span>nueva tarea</span>
                    </v-btn>
                </template>
                    <v-card> 
                        <v-card-title>
                            <h2>NUEVA TAREA</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-text-field label="Dependencia" v-model="dependencia" prepend-icon="mdi-office-building" :rules="inputRules"></v-text-field>
                                <v-text-field label="Titulo" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                                <v-text-field label="Comentario" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-text-field>

                                <v-menu offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="person" :rules="inputRules" v-on="on" label="Responsable" prepend-icon="mdi-account"></v-text-field>
                                    </template>
                                    <v-list flat>
                                        <v-list-item v-for="person in team" :key="person.mail">
                                            <v-item-conten>
                                                <v-list-item-title v-text="person.nombre"></v-list-item-title>
                                            </v-item-conten>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>

                                <v-menu max-width="290">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field :rules="inputRules" :value="formattedDate" v-on="on" label="Fecha límite" prepend-icon="mdi-calendar"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="due"></v-date-picker>
                                </v-menu>

                                <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">agregar</v-btn>
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
        team: [],
        dialog: false,
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
                    dependencia: this.dependencia,
                    title: this.title,
                    content: this.content,
                    due: moment(this.due).format("Do MMM YYYY"),
                    person: this.person,
                    status: 'ongoing'
                }
                db.collection('tareas').add(project).then(() => {
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
    },
  created() {
    db.collection('usuarios').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.team.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
  }
</script>