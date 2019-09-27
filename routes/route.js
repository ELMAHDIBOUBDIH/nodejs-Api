const db = require('../db-connection');
const jwt = require('jsonwebtoken');
var models = require('../models');
var express = require('express');
const app = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');


let secretOrKey = 'authToken';

app.post('/register', function (req, res, next) {
    let user = req.body
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    models.User.findOne({where: {email: user.email}}).then((result) => {
        console.log(res);
        if (result) {
            console.log('asa');
            res.status(400).send('Ce utilisateur existe déjà');
        }
        models.User.create(user).then((user) => {
            models.UserRole.create({idUser: user.id, idRole: 2}) // utilisateur
                .then(() => {
                    res.json({msg: 'le compte d\'utilisateur a été créée avec succès'})
                })
        }).catch((e) => {
            res.status(400).send({msg: e.message});
        })
    }).catch((err) => {
        res.status(400).json({'msg': err.message});
    })
});

app.post('/login', function (req, res) {
    const {email, password} = req.body;
    if (email && password) {
        models.User.findOne({where: {email: email}}).then(async (user) => {
            if (!user) {
                res.send({done: false, msg: 'Aucun utilisateur trouvé'});
            } else {
                const isCompare = await bcrypt.compare(password, user.password);
                if (isCompare) {
                    let payload = {id: user.id, email: user.email, username: user.username, role: user.role};
                    let token = jwt.sign(payload, secretOrKey);
                    res.status(201).send({done: true, token: token});
                } else {
                    res.json({done: false, msg: 'Mot de passe incorrect'});
                }
            }
        });
    }
});

app.get('/getUser', passport.authenticate('jwt', {session: false}), (req, res) => {
    db.query(`select u.* , r.name as role from users u 
              inner JOIN userroles ur on ur.idUser=u.id 
              inner join roles r on r.id = ur.idRole WHERE u.id =${req.user.id}`,
        {type: db.QueryTypes.SELECT}).then((user) => {
        res.send(user);
    })
});

app.get('/getusers', function (req, res) {
    models.User.findAll({limit: 1, order: [['id', 'DESC']]}).then((result) => {
        let xx = result
        console.log(xx[0].id)
    })
})

module.exports = app;