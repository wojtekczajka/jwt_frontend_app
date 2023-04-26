<template>
    <div class="user">
        <div class="container-fluid">
            <h2 class="mt-5 mb-5">Profile</h2>
            <div v-if="isProfileLoaded">
                <div class="row">
                    <div class="col-md-10 mx-auto">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-action list-group-item-dark">Name: {{ name }}</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark">Id: {{ id }}</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark">Email: {{ email }}</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark">Is Active: {{ is_active }}</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark">Roles: {{ roles }}</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark">Token: {{ token }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Loading user profile...</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapState } from "vuex";
import { getRoleNames } from "@/utils/utils";

export default {
    name: "UserView",
    computed: {
        ...mapGetters(["getProfile", "isProfileLoaded"]),
        ...mapState({
            authLoading: state => state.auth.status === "loading",
            name: state => `${state.user.profile.name}`,
            email: state => `${state.user.profile.email}`,
            id: state => `${state.user.profile.id}`,
            is_active: state => `${state.user.profile.is_active}`,
            roles: state => `${getRoleNames(state.user.profile.roles)}`,
            token: state => `${state.auth.token}`
        })
    },
};
</script>
  