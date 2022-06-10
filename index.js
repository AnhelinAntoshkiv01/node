const express = require('express');
const users = require('./db/users');

const app = express();

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:userId', (req, res) => {
    const userIndex = +req.params.userId;

    if (isNaN(userIndex) || userIndex < 0) {
        res.status(400).json('Enter valid id');
        return;
    }

    const user = users[userIndex];

    if (!user) {
        res.status(404).json(`Use with id ${userIndex}`);
        return;
    }
    res.json(user);
});

app.get('/users/create/:userId', (req, res) => {
    const newUser = users.push({
        name: 'Viki'
    });
    const newUsersArr = [...users, newUser];
    res.status(201).json(newUsersArr)
});

app.get('/users/update/:userId', (req, res) => {
    const {userId} = req.params;
    const {name} = req.body;

    const index = users.findIndex((user) => user.id === +userId);

    const updateUser = Object.assign(users[index], name);
    const newUserArr = [...users, updateUser]

    res.status(201).json(newUserArr)
});

app.get('/users/delete/:userId', (req, res) => {
    const {userId} = req.params;

    const index = users.findIndex((user) => user.id === +userId);

    if (!index) {
        return res.status(400).json(`User with id ${userId} not found`)
    }
    const deleteUser = users.splice(index, 1);

    res.status(204).json(deleteUser)
});

app.listen(5000, () => {
    console.log('Port 5000')
})