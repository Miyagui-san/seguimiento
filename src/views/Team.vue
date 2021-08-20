<template>
  <div class="team">
    <h1 class="mx-5">Team</h1>
    <v-container class="my-5">

      <v-row class="pb-5">
        <v-spacer></v-spacer>
        <addUser />
      </v-row>

      <template>
        <v-container>
          <v-expansion-panels popout hover>
            <v-expansion-panel v-for="person in team" :key="person.mail">
              <v-expansion-panel-header>
                <v-row class="pl-3">
                  <v-avatar size="50" class="grey lighten-2">
                    <img :src="person.avatar">
                  </v-avatar>
                  <v-col class="pl-6 pt-5">
                    <span>{{ person.nombre }} {{ person.apellido }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <span>{{ person.mail }}</span>
                  </v-col>
                  <v-col>
                    <span>{{ person.telefono }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </template>

    </v-container>
  </div>
</template>

<script>
import addUser from '@/components/addUser'
import db from '@/fb'
export default {
  components: { addUser },
  data() {
    return {
      team: []
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

