<template>
  <div class="team">
    <h1 class="mx-5">Team</h1>
    <v-container class="my-5">

      <template>
        <v-container>
          <v-expansion-panels popout hover>
            <v-expansion-panel v-for="person in team" :key="person.name">
              <v-expansion-panel-header>
                <v-row class="pl-3">
                  <v-avatar size="50" class="grey lighten-2">
                    <img :src="person.avatar">
                  </v-avatar>
                  <v-col>
                    <span>{{ person.name }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <span>{{ person.role }}</span>
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
export default {
  data() {
    return {
      team: [
        { name: 'The Net Ninja', role: 'Web developer', avatar: '/favicon.ico' },
        { name: 'Ryu', role: 'Graphic designer', avatar: '/favicon.ico' },
        { name: 'Chun Li', role: 'Web developer', avatar: '/favicon.ico' },
        { name: 'Gouken', role: 'Social media maverick', avatar: '/favicon.ico' },
        { name: 'Yoshi', role: 'Sales guru', avatar: '/favicon.ico'}
      ]
    }
  }
}
</script>

