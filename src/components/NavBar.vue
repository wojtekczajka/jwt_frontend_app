<template>
    <div class="nav-bar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
            <div class=container-fluid>
                <a class="navbar-brand px-2" href="#">Authorization using JWT tokens</a>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link class="nav-item nav-link" to="/" exact>Home </router-link>
                        <router-link v-if="isProfileLoaded" class="nav-item nav-link" to="/profile">{{ name }}</router-link>
                        <router-link class="nav-item nav-link" to="/resources">Resources</router-link>
                        <router-link v-if="!isAuthenticated && !authLoading" class="nav-item nav-link"
                            to="/register">Register</router-link>
                        <router-link v-if="!isAuthenticated && !authLoading" class="nav-item nav-link"
                            to="/login">Login</router-link>

                        <a v-if="isAuthenticated" @click="logout" class="nav-item nav-link" href="#">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "../store/actions/auth";

export default {
    name: "NavBar",
    methods: {
        logout: function () {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/"));
        }
    },
    computed: {
        ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
        ...mapState({
            authLoading: state => state.auth.status === "loading",
            name: state => `${state.user.profile.name}`
        })
    }
};
</script>