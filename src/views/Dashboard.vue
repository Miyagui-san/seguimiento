<template>
  <div class="pa-5 dashboard">
    <h1 class="mx-5">Dashboard</h1>
    <v-container class="px-5">
      <v-row class="pa-6">

        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>Awesome! you added a new project!</span>
            <v-btn flat class="white--text" @click="snackbar = false">Close</v-btn>
        </v-snackbar>



      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small flat color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
            <v-icon left small>mdi-folder</v-icon>
            <span class="caption text-lowercase">By project name</span>
          </v-btn>
        </template>
        <span>Sort projects by project name</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small flat color="grey" @click="sortBy('person')" v-bind="attrs" v-on="on">
            <v-icon left small>mdi-account</v-icon>
            <span class="caption text-lowercase">By person</span>
          </v-btn>
        </template>
        <span>Sort projects by person</span>
      </v-tooltip>
      
      <v-spacer></v-spacer>
      <popup @projectAdded="snackbar = true" />

      </v-row>
    </v-container>
     
    <v-container class="pa-6 my-5">

      <v-card flat v-for="project in projects" :key="project.title">
        <v-row row wrap :class="`pa-3 mx-0 project ${project.status}`">

          <v-col md="6">
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-col>

          <v-col>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-col>

          <v-col>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-col>

          <v-col>
            <div class="text-right">
              <v-chip :class="`v-chip--active white--text caption my-2 ${project.status}`">
                {{ project.status }}
                </v-chip>
            </div>
          </v-col>

          <v-col>
            <div class="text-right">
              <v-menu :class="`white--text caption my-2 ${project.status}`">{{ project.status }}</v-menu>
            </div>
          </v-col>

        </v-row>
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
      snackbar: false
    }
  },
  methods: {
    sortBy(prop){
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
  created() {
    db.collection('prueba-vue').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>

<style>

.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid orange;
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