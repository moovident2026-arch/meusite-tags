<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Importação das Rotas (Vamos criar esses arquivos no próximo bloco)
const authRoutes = require('./auth.routes');
const tagRoutes = require('./tag.routes');

const app = express();

// 1. Configuração do Firebase Admin
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Referência ao banco Firestore

// 2. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Servir arquivos estáticos (Pasta Public)
app.use(express.static(path.join(__dirname, 'public')));

// 4. Rotas
app.use('/auth', authRoutes);
app.use('/tags', tagRoutes);

// Rota principal para redirecionar para o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
=======
const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

// ======================
// FIREBASE
// ======================
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ======================
// ATIVAR TAG
// ======================
app.post('/ativar-tag', async (req, res) => {
  const { codigo, nome, cidade, telefone, idade, email } = req.body;

  try {
    const ref = db.collection('tags').doc(codigo);
    const doc = await ref.get();

    if (doc.exists) {
      return res.status(400).json({ error: "Tag já ativada" });
    }

    await ref.set({
      codigo,
      nome,
      cidade,
      telefone,
      idade,
      email,
      ativa: true,
      data: new Date()
    });

    res.json({ message: "Tag ativada com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ======================
// PÚBLICO (ACHOU OBJETO)
// ======================
app.get('/tag/:codigo', async (req, res) => {
  try {
    const doc = await db.collection('tags').doc(req.params.codigo).get();

    if (!doc.exists || !doc.data().ativa) {
      return res.status(404).send("Tag não encontrada");
    }

    const tag = doc.data();

    res.json({
      mensagem: "Objeto encontrado!",
      nome: tag.nome,
      telefone: tag.telefone,
      cidade: tag.cidade
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro");
  }
});

// ======================
// ADMIN - LISTAR
// ======================
app.get('/admin/tags', async (req, res) => {
  try {
    const snapshot = await db.collection('tags').get();
    const dados = snapshot.docs.map(doc => doc.data());
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro" });
  }
});

// ======================
// ADMIN - CANCELAR
// ======================
app.post('/admin/cancelar/:codigo', async (req, res) => {
  try {
    const ref = db.collection('tags').doc(req.params.codigo);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Tag não encontrada" });
    }

    await ref.update({ ativa: false });

    res.json({ message: "Tag cancelada" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro" });
  }
});

// ======================
// TESTE
// ======================
app.get('/', (req, res) => {
  res.send("API rodando com Firebase 🚀");
});

// ======================
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
>>>>>>> e89eb6421e468d50ea3f326b51dc1eb7e3768805
