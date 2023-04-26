<template>
    <div class="register">
        <div class="container-fluid bg-dark">
            <div class="row justify-content-center align-items-center" style="height: 100vh;">
                <div class="col-md-4 col-sm-12 border p-4">
                    <form class="text-light" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="inputEmail" class="form-label">E-mail</label>
                            <input type="email" class="form-control" input required v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Login</label>
                            <input type="text" class="form-control" input required v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" input required v-model="password">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-dark border">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "LoginView",
    data() {
        return {
            name: "",
            email: "",
            password: ""
        };
    },
    methods: {
        handleSubmit() {
            axios.post("/auth/signup/", {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    if (response) {
                        alert("Successfully sign up!");
                        this.$router.push("/");
                    } else {
                        alert("Error signing up. Please try again.");
                    }

                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status !== 200) {
                        alert("Error signing up. Please try again.");
                    }
                });
        }
    }
};
</script>

<style>
/* Add any custom styles here */
</style>