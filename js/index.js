"use strict";

const messageSystem = {
  startFetching() {
  },

  sendMessage(msg) {
    // https://thecrew.cc/api/message/create.php?token=__TOKEN__ POST
  },

  fetchMessages() {
    // https://thecrew.cc/api/message/read.php?token=__TOKEN__ GET
    fetch ('https://thecrew.cc/api/message/read.php?token=' + userSystem.token)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }
};

const userSystem = {
  token: "",
  loggedIn: false,
  checkToken() {
    const token = this.getToken();
    if(token !== null) {
      this.token = token;

      messageSystem.fetchMessages();

      document.getElementById('loginWindow').remove();
  
    }
  },
  saveToken() {
    localStorage.setItem("token", this.token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  logout() { 
    localStorage.removeItem("token");
  },

  login(email, password) {
    // https://thecrew.cc/api/user/login.php POST
    fetch ('https://thecrew.cc/api/user/login.php', {method: 'POST', body: JSON.stringify({email: email, password: password}) })
    .then(response => response.json())
    .then(data => {
      const token = data.token;
      this.token = token;
      this.saveToken();
      messageSystem.fetchMessages();
      console.log(data);

    });
  },

  updateUser(password, handle) {
    // https://thecrew.cc/api/user/update.php?token=__TOKEN__ POST
  }
};

const display = {
  initFields() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", this.submitHandler);
    console.log('form =', form);
  },
  submitHandler(e){
    e.preventDefault();
    const email = document.getElementById('emailField').value;
    const password = document.getElementById('passwordField').value;
    userSystem.login(email, password);
},
};
  display.initFields();
userSystem.checkToken();