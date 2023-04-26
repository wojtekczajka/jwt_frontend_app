<template>
  <div class="login">
    <div class="container-fluid bg-dark">
      <div class="row justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-md-4 col-sm-12 border p-4">
          <form class="text-light" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="inputLogin" class="form-label">Login</label>
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
import { AUTH_REQUEST } from "../store/actions/auth";

export default {
  name: "LoginView",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    handleSubmit: function () {
      const { name, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { name, password })
        .then(() => {
          alert("You have been successfuly logged in :)");
          this.$router.push("/");
        })
        .catch((error) => {
          alert("Error logging up. Please try again.");
          console.log(error);
        });
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
