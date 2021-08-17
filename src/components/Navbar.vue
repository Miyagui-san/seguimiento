<template>
    <nav>


        <v-app-bar app dark>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <span>Paravial</span>

                <v-spacer />

                <v-toolbar-title class="text-uppercase white--text">
                    <span>Para</span>
                    <span class="font-weight-light">Vial</span>
                </v-toolbar-title>

                <v-spacer />

                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn flat v-on="on" color="grey">
                            <v-icon left>mdi-expand-all</v-icon>
                            <v-span>Menu</v-span>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                            <v-list-item-title>{{ link.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-btn flat color="error">
                    <span>sign out</span>
                    <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" class="indigo">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>


    </nav>
</template>

<script>
export default {
    data() {
        return {
         drawer: true,
         links: [
            {icon: 'mdi-view-dashboard', text:'Dashboard', route:'/'},
            {icon: 'mdi-view-week', text:'Team', route:'/Team'},
            {icon: 'mdi-view-stream', text:'Discord', route:'/discord'},
            {icon: 'mdi-mailbox', text:'Inbox', route:'/inbox'},
         ],
        }
    }
}
</script>