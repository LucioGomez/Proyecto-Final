const User = require('../models/User');
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const sendEmail = require('../utils/mail');

const forgotPassword = async (req, res, next) => {
    // Agarro la informacion del email de usuario
    const {mail} =req.body
    const user = await User.findOne({ mail })
    if(!user) {
        return next(res.status(404).send('Ther is no user with this mail address'))
       }
    // Genero token
   const token = await jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn:'10m'});

   return user.updateOne({resetLink: token}, (err, success) => {
       if(err) {
           return res.status(400).json({error: "reset password link error"});
       } else {
       sendEmail({
            email:user.mail,
            subject: 'Your password reset token (valid for 10 min)',
            message:`
            Please click on given link to reset your password:
            COPY THIS TOKEN AND PASTE IT IN THE CAR SHOP: ${token}
            `
        });
        res.status(200).json({
                       status: 'success',
                       message: 'Token sent to email!'
                   })
       }
   })
    // El usuario lo recibe por mail
//    const resetURL = `${req.protocol}://${req.get(
//        'host'
//        )}/resetPassword/${resetToken}`;
   
//        const message = `Forgot your password? Submit a PATCH req with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
//    try{
//        await sendEmail({
//            email:user.mail,
//            subject: 'Your password reset token (valid for 10 min)',
//            message
//        });
       
//        res.status(200).json({
//            status: 'success',
//            message: 'Token sent to email!'
//        })
//    } catch (err) {
//        user.createPasswordResetToken = undefined
//        user.createPasswordResetExpires = undefined
//        await user.save();
   
//        return next(err, 500)
//    }
   
   }

   
//    const updatePassword = async (req,res,next) => {
//    // Agarrar usuario de la coleccion
//    const {mail} = req.body
//    const user = await User.findById(req.user.id).select('+password');
     
//    // Verificar si la contraseña posteada es correcta
//    console.log(user.currentPassword)
//    if (!(await user.matchPassword(req.body.currentPassword, user.password))) {
//        return next(Error, 401)
//    }
   

//    // Si pasa eso, actualiza el password
//    user.password = req.body.password
//    user.confirm_password = req.body.confirm_password
//    await user.save();

//    // Logear el usuario, enviar JWT
//    const token = generateToken(user._id)
   
//    res.status(200).json({
//        status: 'success',
//        token,
//        data: {
//            user
//        }
//    })
//    }


   const resetPassword = (req, res, next) => {
   // Obtener el usuario basado en el token
   const {resetLink, newPass} = req.body;
   if(resetLink) {
jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(error, decodedData){
if(error){
    return res.status(401).json({
        error: "Incorrect or expired token"
    })
}
  User.findOne({resetLink}, async (err, user) => {
      if(err || !user) {
          return res.status(400).json({error: "User with this token does not exists."})
      }
      const obj = {
          password: newPass,
          resetLink: ''
      }

      user = _.extend(user, obj);
      user.password = await user.encryptPassword(newPass);
    await user.save()
      user.save((err, result) => {
        if(err) {
            return res.status(400).json({error: "User password error."});
        } else {
            return res.status(200).json({message: 'Your password has been changed'})
        }
      })

  })
})
   }else{
       return res.status(401).json({error: "Authentication error!"})
   }
//    const hashToken = crypto
//    .createHash('sha256')
//    .update(req.params.token)
//    .digest('hex')
   
//    const user = await User.findOne({passwordResetToken: hashToken,
//        PasswordResetExpires: {$gt: Date.now()}})
   
//    // Si el token no expiro, y el usuario existe, setea la nueva contraseña
//    if(!user) {
//        return next(error)
//    }
//    user.password = req.body.password
//    user.confirm_password = req.body.confirm_password
//    user.passwordResetToken = undefined;
//    user.PasswordResetExpires = undefined;
//    await user.save();
   
//    // Actualizar la contraseña cambiada como propiedad para el usuario
   
//    // Logear el user y enviar JWT
//    const token = generateToken(user._id)
   
//    res.status(200).json({
//        status: 'success',
//        token
//    })
   }

   module.exports = {
       forgotPassword,
       resetPassword,
     
   }