<<<<<<< HEAD
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = admin.firestore();

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o usuário já existe
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (doc.exists) {
            return res.status(400).json({ message: 'Este e-mail já está cadastrado!' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salva no Firebase
        await userRef.set({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const user = doc.data();
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }

        // Gera o Token JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login realizado!', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login', error: error.message });
    }
=======
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Senha obrigatória" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro no registro" });
  }
>>>>>>> e89eb6421e468d50ea3f326b51dc1eb7e3768805
};