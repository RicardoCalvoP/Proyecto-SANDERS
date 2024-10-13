import nodemailer from "nodemailer";

// Define a route for sending emails
const sendEmail = async (donator_email, donator_name, amount) => {

    const formattedAmount = amount.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
    });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mail.sender.tec@gmail.com",
            pass: "dfzq sybv onsv bkag",
        },
    });

    // Set up email options
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: donator_email,
        subject: 'Donación fundación SANDERS',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <!-- Logo de la organización usando el cid -->
            <div style="text-align: center;">
                <img src="https://sanders.com.mx/wp-content/uploads/2022/08/5.png" alt="Logo Fundación SANDERS" style="max-width: 150px;" />
            </div>
            
            <!-- Saludo inicial -->
            <h2 style="color: #4CAF50; text-align: center;">¡Hola ${donator_name}! </h2>
    
            <!-- Cuerpo del mensaje -->
            <p style="font-size: 1.1rem;">
                En nombre de todos los que formamos parte de la <strong>Fundación Sanders</strong>, queremos expresarte nuestra más sincera gratitud por tu generosa donación de <strong>${formattedAmount} MXN</strong>.
            </p>
            <p style="font-size: 1.1rem;">
                Tu contribución nos permite seguir adelante con nuestra misión de <strong>apoyar a quienes más lo necesitan</strong>. Gracias a personas como tú, podemos continuar ofreciendo esperanza, recursos y asistencia a comunidades vulnerables. 🌍✨
            </p>
            <p style="font-size: 1.1rem;">
                Si tienes alguna pregunta o deseas conocer más sobre cómo estamos utilizando tu donación para cambiar vidas, no dudes en ponerte en contacto con nosotros. ¡Estaremos encantados de mantenerte informado sobre los avances que estás ayudando a lograr! 😊
            </p>
            <p style="font-size: 1.1rem;">
                Una vez más, <strong>¡gracias por tu generosidad!</strong> ❤️
            </p>
    
            <!-- Firma del equipo -->
            <p style="font-size: 1.1rem;">Con aprecio, <strong>el equipo de la Fundación Sanders</strong> 🏢</p>
    
            <!-- Línea divisoria -->
            <hr style="border: none; border-top: 1px solid #000000; margin: 20px 0;" />
    
            <!-- Información de contacto -->
            <div style="font-size: 0.9em; color: #555; text-align: center;">
                <h3>Contacto</h3>
                <p><strong>📞 Teléfono:</strong> 55 1707-6203</p>
                <p><strong>✉️ Correo:</strong> <a href="mailto:contacto@sanders.com.mx" style="color: #0000FF; text-decoration: none;">contacto@sanders.com.mx</a></p>
                <p><strong>🌐 Sitio web:</strong> <a href="https://sanders.com.mx" target="_blank" style="color: #0000FF; text-decoration: none;">https://sanders.com.mx</a></p>
            </div>
        </div>
        `
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
