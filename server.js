const express = require('express');
const path = require('path');
require('dotenv').config();

const admin = require('firebase-admin');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// ================= FIREBASE =================
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// ================= MIDDLEWARES =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// ================= ROTAS =================

// TESTE
app.get('/', (req, res) => {
  res.send('🚀 API Devolva Aqui rodando!');
});

// BUSCAR TAG
app.get('/tag/:codigo', async (req, res) => {
  const { codigo } = req.params;

  try {
    const tag = await prisma.tag.findUnique({
      where: { tag: codigo },
      include: { user: true }
    });

    if (!tag) {
      return res.status(404).send('Tag não encontrada');
    }

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
  }
});

// CADASTRAR USUÁRIO
app.post('/register', async (req, res) => {
  const { name, email, password, whatsapp, birthdate, city } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        whatsapp,
        birthdate,
        city
      }
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar');
  }
});

// ================= SERVIDOR =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});