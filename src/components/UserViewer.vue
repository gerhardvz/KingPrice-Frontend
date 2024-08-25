<script>
import api from "../scripts/api.js";
import UserView from "../views/UserView.vue";

export default {
  name: "UserViewer",
  components: {UserView},
  data() {
    return {
      users: [],
      showUserModal:false,
      UserModalEdit:false,
      UserModalNew:false,
      userId:""
    }
  },
  methods: {
    Refresh() {
      api.GetUsers((x) => {
        this.users = x
      }, console.error)
    },
    AddUser() {
      this.showUserModal=true
      this.userId=null;
      this.UserModalEdit=false
      this.UserModalNew=true
    },

    viewUser(id){
      this.showUserModal=false;
      this.userId=id;
      this.showUserModal=true;
      this.UserModalEdit=false
      this.UserModalNew=false;
    }
  },
  watch:{
    
  },
  mounted() {
    this.Refresh();
  },
  computed: {
    ListGroups(list) {
      var groups = list.map((item) => {item.name})
      return groups
    }
  }
}
</script>

<template>
  <div>
    <table>
      <tr>
        <th>User Id</th>
        <th>User Name</th>
        <th>User Surname</th>
        <th>User Email</th>
        
      </tr>
      <tr v-for="user in users" :key="user.id" v-on:click="viewUser(user.id)">
        <th>{{ user.id }}</th>
        <th>{{ user.name }}</th>
        <th>{{ user.surname }}</th>
        <th>{{ user.email }}</th>
        
      </tr>
    </table>
    <div>
      <button v-on:click="Refresh">Refresh</button>
      <button v-on:click="AddUser">Add</button>
      
      
    </div>
    <div v-if="showUserModal" class="userView">
        <user-view :edit="UserModalEdit" :new="UserModalNew" :userId="userId"></user-view>
    </div>
  </div>
</template>

<style scoped>
.userView{
  height: 50%;
  width: 50%;
  margin: auto auto;
}
</style>