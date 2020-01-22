const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../models').users;
const bcrypt = require('bcryptjs');

//Strategies
module.exports = function init(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done){ // Verify callback
            users.findOne({where:{username:username}})
                .then(user => {
                    if (!user){
                        return done(null, false, {message:'Incorrect usernamO!'});
                    }
                    if (!bcrypt.compare(password, user.password)){
                        return done(null, false, {message:'Incorrect passwordO!'})
                    }
                    return done(null, user);
                })
                .catch(err => done(err));
        }
    ));

    passport.serializeUser(function(user, done) {
            done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        users.findOne({where:{id:id}})
            .then(user => done(null, user))
            .catch(err => console.log(err));
    });
}
//////////////

// module.exports = async function initialize(passport) {

//     const authenticateUser = async function(username, password, done){

//         const user = await users.findOne({where:{username:username}});

//         if (user == null){
//             return done(null, false, {message: 'No user with that username.'}); //done(erro, usuário, mensagem)
//         }

//         try {
//             if (await bcrypt.compare(password, user.password)){
//                 return done(null, user);
//             } else {
//                 return done(null, false, {message: 'Incorrect password.'});
//             }
//         } catch(error) {
//             return done(error);
//         }

//     }

//     passport.use(new LocalStrategy({ usernameField:'username' }, authenticateUser));

//     passport.serializeUser(function(user, done) {
//         return done(null, user.id);
//     });
//     passport.deserializeUser(function(id, done) {
//         return done(null, user.id);
//     });
// };