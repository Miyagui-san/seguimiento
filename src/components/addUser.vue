<template>
    <v-div class="text-center" flat>
        <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn flat class="success lighten-4 black--text" v-on="on">
                        <span>CREAR USUARIO</span>
                    </v-btn>
                </template>
                    <v-card> 
                        <v-card-title>
                            <h2>NUEVO USUARIO</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-text-field label="Nombre" v-model="nombre" prepend-icon="mdi-badge-account-horizontal-outline" :rules="inputRules"></v-text-field>
                                <v-text-field label="Apellido" v-model="apellido" prepend-icon="mdi-badge-account-horizontal-outline" :rules="inputRules"></v-text-field>
                                <v-text-field label="E-mail" v-model="mail" prepend-icon="mdi-email" :rules="inputRules"></v-text-field>
                                <v-text-field label="Telofono" v-model="telefono" prepend-icon="mdi-phone" :rules="inputRules"></v-text-field>

                                <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add user</v-btn>
                            </v-form>
                        </v-card-text>

                    </v-card>
        </v-dialog>
    </v-div>
</template>

<script>
  import db from '@/fb';
  export default {
    data () {
      return {
        dialog: false,
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
                const usuario = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    mail: this.mail,
                    telefono: this.telefono,
                }
                db.collection('usuarios').add(usuario).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('projectAdded')
                })
            }
        }
    },
  }
</script>