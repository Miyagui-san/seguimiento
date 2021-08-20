<template>
    <div class="white pa-5">
        <h1 class="mx-5">Tareas</h1>
        <v-container class="px-5">
            <v-row class="pa-6">

                <v-snackbar color="" v-model="snackbar" :timeout="4000" top centered>
                        <v-btn depressed class="transparent" @click="snackbar = false">
                            <span>Nueva tarea añadida</span>
                        </v-btn>
                </v-snackbar>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="grey lighten-4" @click="sortBy('title')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-folder</v-icon>
                        <span class="caption text-lowercase">tarea</span>
                    </v-btn>
                    </template>
                    <span>Ordenar por titulo de tarea</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mx-1" small depressed color="grey lighten-4" @click="sortBy('person')" v-bind="attrs" v-on="on">
                        <v-icon left small>mdi-account</v-icon>
                        <span class="caption text-lowercase">responsable</span>
                    </v-btn>
                    </template>
                    <span>Ordenar por responsable</span>
                </v-tooltip>
                
                <v-spacer></v-spacer>
                
                <popup @projectAdded="snackbar = true" />

            </v-row>
        </v-container>
        
        <v-container class="pa-2 my-5">
            <v-card flat v-for="dependencia in dependencias" :key="dependencia.dependencia">
                <v-row class="pa-3">
                    <h4> {{ dependencia.dependencia }} </h4>
                </v-row>
                <v-card flat v-for="project in projects" :key="project.title">
                    <v-row row wrap class="py-1 mx-0" v-if="project.dependencia == dependencia.dependencia">

                    <v-col :class="` project ${project.status}`" md="6">
                        <div class="caption grey--text">Project title</div>
                        <div>{{ project.title }}</div>
                    </v-col>

                    <v-col class="grey lighten-4 mx-1">
                        <div class="caption grey--text">Person</div>
                        <div>{{ project.person }}</div>
                    </v-col>

                    <v-col class="grey lighten-4">
                        <div class="caption grey--text">Due by</div>
                        <div>{{ project.due }}</div>
                    </v-col>

                    <v-col cols="1" class="grey lighten-4 mx-1">
                        <v-chip label :class="`v-chip--active white--text caption my-2 ${project.status}`">
                            {{ project.status }}
                        </v-chip>
                    </v-col>

                    <v-col class="grey lighten-4">
                        <div class="text-right">
                        <v-menu :class="`white--text caption my-2 ${project.status}`">{{ project.status }}</v-menu>
                        </div>
                    </v-col>

                    </v-row>
                </v-card>
            </v-card>
        </v-container>
        
    </div>
</template>

<script>
import popup from '@/components/Popup'
import db from '@/fb'
export default {
  components: { popup },
  data() {
    return{
      projects: [],
      dependencias: [],
      snackbar: false
    }
  },
  methods: {
    sortBy(prop){
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
  created() {
    db.collection('tareas').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    }),
    db.collection('dependencias').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.dependencias.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })

  },
}
</script>

<style>

.project.complete{
  border-left: 4px solid #3cd1c2;
  background: #F5F5F5;
}
.project.ongoing{
  border-left: 4px solid orange;
  background: #F5F5F5;
}
.project.overdue{
  border-left: 4px solid tomato;
}
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: orange;
}
.v-chip.overdue{
  background: tomato;
}

</style>