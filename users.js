const fs = require('fs');

var fetchUsers = () => {
  try {
    var usersString = fs.readFileSync('users-data.json');
    return JSON.parse(usersString);
  } catch (e) {
    console.log('Unable to fetch user(s).');
    return [];
  }
};

var saveUsers = (users) => {
    fs.writeFileSync('users-data.json', JSON.stringify(users));
};

var addUser = (username, description, admin) => {
  var users = fetchUsers();
  var user = {
    username,
    description,
    admin
  };
  var duplicateUsername = users.filter((user) => user.username === username);

  if(duplicateUsername.length === 0) {
    users.push(user);
    saveUsers(users);
    return user;
  }
};

var getUsers = () => {
  return fetchUsers();
};

var getUser = (user) => {
  var users = fetchUsers();
  var filterUser = users.filter((user) => user.username === username);
  return filterUser[0];
};

var removeUser = (username) => {
  var users = fetchUsers();
  var removeUser = users.filter((user) => user.username !== username);
  saveUsers(removeUser);
  return users.length !== removeUser;
};

var userInfo = (user) => {
  console.log('---');
  console.log(`Username: ${user.username}`);
  console.log(`Description: ${user.descritpion}`);
  console.log(`Admin: ${user.admin}`);
}

module.exports = {
  deleteUsers,
  addUser,
  getUsers,
  userInfo,
  getUser,
  removeUser
}
