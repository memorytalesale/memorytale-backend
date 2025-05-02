require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // importante para Render

// Middleware
app.use(cors());
app.use(express.json());

// Ruta POST para recibir el formulario
app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de ${nombre}`,
    text: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
});

// Ruta GET raíz (simple respuesta de prueba)
app.get('/', (req, res) => {
  res.send('✅ MemoryTale backend funcionando correctamente 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

