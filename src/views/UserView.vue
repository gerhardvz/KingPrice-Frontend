<script>
import api from "../scripts/api.js";

export default {
  name: "UserView",
  props: ["edit", "new", "userId"],
  data() {
    return {
      indicators: {
        AddUserToGroup: false,
        RemoveUserFromGroup: false,
      },
      select: {
        add: null,
        remove: null,
      },
      user: {},
      groups: []
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    userId(newVal) {
      this.getData()
    },
    edit(newVal) {

    },
    new(newVal) {

    }
  },
  methods: {
    AddNewUser() {
      api.AddUsers(this.user,
          s => {
            this.user = {}
          },
          console.error)
    },
    clearData() {
      this.indicators = {
        AddUserToGroup: false,
        RemoveUserFromGroup: false,
      }
      this.select = {
        add: null,
        remove: null,
      }
      this.user = {}
      this.groups = []
    },
    getData() {
      this.clearData()
      if (this.userId !== null) {
        api.GetUser(this.userId,
            s => {
              this.user = s
            })
        api.GetGroups(
            s => {
              this.groups = s
            },
            console.error
        )
      } else {
        this.user = {name: "", surname: "", email: ""}
      }
    },
    addGroup() {
      api.AddUserToGroup(this.select.add, this.userId,
          s => {
            this.indicators.AddUserToGroup = false;
            this.getData()
          }, console.error)
    },
    removeGroup() {
      api.RemoveUserFromGroup(this.select.remove, this.userId,
          s => {
            this.indicators.AddUserToGroup = false;
            this.getData()
          }, console.error)
    },
    RemoveUser() {
      api.DeleteUser(this.user.id,
          s => {
            this.clearData()
          },
          console.error)
    },
    UpdateUser() {
      api.UpdateUsers(this.user,
          s => {
            this.getData()
          },
          console.error)
    },
  }
}
</script>

<template>
  <div v-if="user" class="user-view">


    <label for="name">Name</label>
    <input id="name" type="text" v-model="user.name">
    <label for="surname">Surname</label>
    <input id="surname" type="text" v-model="user.surname">
    <label for="email">Email</label>
    <input id="email" type="text"  v-model="user.email">
    <label for="groups">Groups</label>
    <p v-for="group in this.user.groups ">{{ group.name }}</p>
    <div v-if="this.new">
      <button v-on:click="AddNewUser()">Add User</button>
    </div>
    <div v-else>

      <div v-if="indicators.AddUserToGroup" class="Groups">
        <span>Groups</span>
        <select v-model="select.add">
          <option disabled value="">Please select one</option>
          <option v-for="group in groups" :value="group.id">{{ group.name }}</option>

        </select>
        <button v-on:click="addGroup">Add</button>
        <button v-on:click="indicators.AddUserToGroup=false">Cancel</button>
      </div>
      <div v-if="indicators.RemoveUserFromGroup" class="Groups">
        <span>Groups</span>
        <select v-model="select.remove">
          <option disabled value="">Please select one</option>
          <option v-for="group in user.groups" :value="group.id">{{ group.name }}</option>

        </select>
        <button v-on:click="removeGroup">Remove</button>
        <button v-on:click="indicators.RemoveUserFromGroup=false">Cancel</button>
      </div>
      <button v-on:click="UpdateUser">Update</button>
      <button v-on:click="RemoveUser">Remove</button>
      <button v-on:click="indicators.AddUserToGroup=true">Add Group</button>
      <button v-on:click="indicators.RemoveUserFromGroup=true">Remove Group</button>
    </div>


  </div>

</template>

<style scoped>

</style>