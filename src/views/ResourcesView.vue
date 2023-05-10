<template>
    <div class="resources">
        <h1>Resources</h1>
        <div v-if="loading">
            Loading resources...
        </div>
        <div v-else>
            <div v-if="adminResources" class="mt-5 mb-5 bg-secondary">
                <hr class="hr hr-blurry" />
                <h2>Admin Resources</h2>
                <h3>Users data</h3>
                <table class="table table-hover table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Hashed Password</th>
                            <th scope="col">Roles</th>
                            <th scope="col">Delete User</th>
                            <th scope="col">Activate User</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="resource in adminResources" :key="resource.id">
                            <th scope="row">{{ resource.id }}</th>
                            <td>{{ resource.name }}</td>
                            <td>{{ resource.email }}</td>
                            <td>{{ resource.is_active }}</td>
                            <td>{{ resource.hashed_password }}</td>
                            <td>{{ this.getRoleNames(resource.roles) }}</td>
                            <td>
                                <button class="btn btn-danger" @click="deleteUser(resource.id)">Delete</button>
                            </td>
                            <td>
                                <button class="btn btn-primary" :disabled="resource.is_active"
                                    @click="activateUser(resource.id)">
                                    Activate
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="userResources" class="mt-5 mb-5 bg-secondary">
                <hr class="hr hr-blurry" />
                <h2>User Resources</h2>

                <h3>About Roles...</h3>
                <table class="table table-hover table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="resource in userResources" :key="resource.id">
                            <th scope="row">{{ resource.id }}</th>
                            <td>{{ resource.name }}</td>
                            <td>{{ resource.description }}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <hr class="hr hr-blurry" />
            <div v-if="publicResources" class="mt-5 mb-5 bg-secondary">
                <h2>Public Resources: {{ publicResources }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getRoleNames } from "@/utils/utils";
import { mapGetters, mapState } from "vuex";
// import { response } from 'express';

export default {
    name: 'ResourcesView',
    data() {
        return {
            userResources: null,
            adminResources: null,
            publicResources: null,
            loading: false,
        };
    },

    computed: {
        ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
        ...mapState({
            roles: state => `${getRoleNames(state.user.profile.roles)}`,
        })
    },

    watch: {
        isProfileLoaded(newValue) {
            if (newValue) {
                this.loadResources();
            }
        },
    },

    methods: {
        getRoleNames,
        async getResources(endpoint, token) {
            try {
                this.loading = true;
                const response = await axios.get(endpoint, { token });
                return response.data;
            } catch (error) {
                console.error(error);
                return null;
            } finally {
                this.loading = false;
            }
        },
        async loadResources() {
            console.log("---------------------");
            console.log(this.isProfileLoaded);
            console.log(this.roles);
            console.log("---------------------");
            this.publicResources = await this.getResources('/resource/public/');
            console.log(this.publicResources);
            if (this.isProfileLoaded && this.roles.includes("Admin")) {
                console.log("trace1");
                this.adminResources = await this.getResources('/resource/admin/');
            }
            if (this.isProfileLoaded && this.roles.includes("User")) {
                console.log("trace2");
                this.userResources = await this.getResources('/resource/user/');
                console.log("here!");
            }
        },
        deleteUser(userId) {
            axios.delete('/user/', {
                data: { user_id: userId },
            })
                .then(response => {
                    if (response) {
                        alert("User deleted successfully");
                        return this.getResources('/resource/admin/');
                    } else {
                        alert("Error deleting user. Please try again.");
                    }
                })
                .then(resources => {
                    this.adminResources = resources;
                })
                .catch(error => {
                    console.log(error);
                    alert("Error deleting user. Please try again.");
                });
        },
        activateUser(userId) {
            axios.put('/activate_user/', { user_id: userId })
                .then(response => {
                    if (response) {
                        alert("User activated successfully");
                        return this.getResources('/resource/admin/');
                    } else {
                        alert("Error activating user. Please try again.");
                    }
                })
                .then(resources => {
                    this.adminResources = resources;
                })
                .catch(error => {
                    console.log(error);
                    alert("Error activating user. Please try again.");
                });
        },
    },

    async mounted() {
        this.loadResources();
    },
};
</script>