import nodemailer from "nodemailer";

// Define a route for sending emails
const sendEmail = async (donator_email, donator_name, amount) => {

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mail.sender.tec@gmail.com",
            pass: "dfzq sybv onsv bkag",
        },
    });


    // Set up email option
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: donator_email,
        subject: 'Donación fundación SANDERS',
        text: `¡Hola ${donator_name}! \n
En nombre de todos los que formamos parte de la Fundación SANDERS, queremos expresarte nuestra más sincera gratitud por tu donación de ${amount} MXN.\n
Tu contribución nos permite seguir adelante con nuestra misión de apoyar a quienes más lo necesitan. Gracias a personas como tú, podemos continuar ofreciendo esperanza, recursos y asistencia a comunidades vulnerables.\n
Si tienes alguna pregunta o deseas conocer más sobre cómo estamos utilizando tu donación para cambiar vidas, no dudes en ponerte en contacto con nosotros. ¡Estaremos encantados de mantenerte informado sobre los avances que estás ayudando a lograr!\n
Una vez más, ¡gracias por tu generosidad!\n
Con aprecio el equipo de la Fundación SANDERS`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent correctly');
        return info; // Devuelve la información del email enviado
    } catch (error) {
        console.error(error);
        throw error; // Lanza el error para que sea capturado en el `catch` del controlador
    }
};

export default sendEmail;