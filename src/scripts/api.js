import axios from 'axios';

let nonAuthGetInstance = axios.create({
    method: "get"
})
let nonAuthPostInstance = axios.create({
    method: "post"
})
let nonAuthPutInstance = axios.create({
    method: "put"
})
let nonAuthDeleteInstance = axios.create({
    method: "DELETE"
})

export default {
    baseUrl: "http://localhost:8080/",

    //===========User Management ================
    GetUsers(s, e) {
        nonAuthGetInstance({url: this.baseUrl + "User/GetAll"})
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    GetUser(id, s, e) {
        nonAuthGetInstance({url: this.baseUrl + "User/" + id})
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    DeleteUser(id, s, e) {
        nonAuthDeleteInstance({url: this.baseUrl + "User/" + id})
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    GetUserGroups(s, e) {
        nonAuthGetInstance({
            url: `${this.baseUrl}User/${id}/Groups`
        })
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    AddUsers(user, s, e) {
        nonAuthPostInstance({
            url: this.baseUrl + "User/Add",
            data: {name: user.name, surname: user.surname, email: user.email}
        })
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    UpdateUsers(user, s, e) {
        nonAuthPutInstance({
            url: this.baseUrl + "User/Update",
            data:user
        })
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },

    //===========   Group Management    ================
    GetGroups(s, e) {
        nonAuthGetInstance({
            url: this.baseUrl + "Group/GetAll",

        })
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    GetGroup(id, s, e) {
        nonAuthGetInstance({url: this.baseUrl + "Group/" + id})
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },

    AddUserToGroup(groupId, userId, s, e) {
        nonAuthPostInstance({
            url: `${this.baseUrl}Group/${groupId}/AddUser?userId=${userId}`,

        })
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    RemoveUserFromGroup(groupId, userId, s, e) {
        nonAuthDeleteInstance({
            url: `${this.baseUrl}Group/${groupId}/RemoveUser?userId=${userId}`
        })
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    //===========   Permission Management    ================
    GetPermissions(s, e) {
        nonAuthGetInstance(this.baseUrl + "Permission/GetAll")
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },
    GetPermission(id, s, e) {
        nonAuthGetInstance(this.baseUrl + "Permission/" + id)
            .then(res => {
                s(res.data)
            })
            .catch(err => {
                e(err)
            })
    },

}