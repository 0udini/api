let User = require ('../model/user');

// Récupérer tous les users (GET)
function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }
        else {
            res.send(users);
        }
    });
}

//Récupérer un user par son id (GET)
function getUser(req, res){
    console.log("GET user recu : " + req.params.id);
    var mongoose = require('mongoose');
    let userId = mongoose.Types.ObjectId(req.params.id);

    User.findOne({_id: userId
    }, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    }
    )
}

function getUserByName(req, res){
    console.log("GET user recu : " + req.params.name);
    var mongoose = require('mongoose');
    let userName = req.params.name;
    User.findOne({name: userName
    }, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    }
    )
}
function getUserNames(req, res){
    User.find((err, users) => {
        if(err){ res.send(err)}
        else {
            let userNames = [];
            for (let i = 0; i < users.length; i++) {
                userNames.push(users[i].name);
            }
            res.json(userNames);
        }
    })
}


// Ajout d'un user (POST)
function postUser(req, res){
    let user = new User();
    var mongoose = require('mongoose');
    user._id = mongoose.Types.ObjectId();
    user.name = req.body.name;
    user.password = req.body.password;
    console.log("User ID", user._id);
    console.log("req ID", req.body.id);
    console.log("POST user reçu :");
    console.log(user); 
    user.save((err) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.status(200).json({ message: `${user.name} added!` });
        }
    });
}

// Modifier un user (PUT)
function updateUser(req, res){  
    var mongoose = require('mongoose');
    let userId = mongoose.Types.ObjectId(req.params.id);
    User.findOne({_id: userId}, (err, user) => {
        if(err){
            res.send(err);
        }
        else {
            user.name = req.body.name;
            user.password = req.body.password;
            user.save((err) => {
                if(err){
                    res.send(err);
                }
                else {
                    res.json({message: 'User updated!'});
                }
            });
        }
    });
}

// Supprimer un user (DELETE)
function deleteUser(req, res){
    var mongoose = require('mongoose');
    let userId = mongoose.Types.ObjectId(req.params.id);
    User.remove({_id: userId}, (err, result) => {
        res.json({message: "User successfully deleted!", result});
    });
}

module.exports = {getUsers, getUser, getUserByName, postUser, updateUser, deleteUser,getUserNames};