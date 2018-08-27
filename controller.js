const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const users = require('./users.js');

const usernameOptions = {
  describe: 'Username of the user.',
  demand: true,
  alias: 'u'
};

const descriptionOptions = {
  describe: 'Information about the user.',
  demand: true,
  alias: 'd'
};

const adminOptions = {
  describe: 'Boolean to check if user is adminstrator.',
  demand: true,
  alias: 'a'
};

const argv = yargs
  .command('users', 'List all users')
  .command('user', 'List a user', {
    username: usernameOptions
  })
  .command('adduser', 'Create a user', {
    username: usernameOptions,
    description: descriptionOptions,
    admin: adminOptions
  })
  .command('removeuser', 'Remove a user', {
    username: usernameOptions
  })
  .help()
  .argv;


var command = process.argv[2];

if (command === 'users') {
  var allUsers = users.getUsers();
  console.log(`Printing ${allUsers.length} user(s).`);
  allUsers.forEach((user) => users.userInfo(user));
}

else if (command === 'user') {
  var user = users.getUser(argv.username);
  if (user) {
    console.log('User found.');
    users.userInfo(user);
  }
  else {
    console.log('User not found.');
  }
}

else if (command === 'adduser') {
  var user = users.addUser(argv.username, argv.description, argv.admin);
  if (user) {
    console.log("User created.");
  }
  else {
    console.log("Username taken");
  }
}

else if (command === 'removeuser') {
  var userRemove = users.removeUser(argv.username);
  var message = userRemove ? 'User was removed'
    : 'User not found';
    console.log(message);
}
