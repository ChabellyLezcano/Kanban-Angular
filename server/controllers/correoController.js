const { response, request } = require("express");
const nodemailer = require('nodemailer');

const enviarCorreoDoctor = (req=request, res=response) => {
    let body = req.body;

    const { email, password } = req;

    let config = nodemailer.createTransport({
        host: 'smpt.gmail.com',
        post: 587,
        auth: {
            user: email,
            pass: password
        }
    })

    const opciones = {
        from: email,
        subjet: body.asunto,
        to: body.email,
        text: body.mensaje
    }

    config.sendMail(opciones, function(err, result){
        if(err){
            response.json({
                ok: true,
                msg: err
            })
        }
        return res.json({
            ok: 'true',
            msg: result
        })
    })
}

module.exports = {
    enviarCorreoDoctor
}