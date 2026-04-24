<<<<<<< HEAD
const admin = require('firebase-admin');
const db = admin.firestore();

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'O nome da tag é obrigatório!' });

        const tagRef = await db.collection('tags').add({
            name,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: 'Tag criada com sucesso!', id: tagRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tag', error: error.message });
    }
};

exports.getTags = async (req, res) => {
    try {
        const snapshot = await db.collection('tags').get();
        const tags = [];
        snapshot.forEach(doc => {
            tags.push({ id: doc.id, ...doc.data() });
        });
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tags', error: error.message });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('tags').doc(id).delete();
        res.json({ message: 'Tag deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tag', error: error.message });
    }
=======
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ativar tag (vincular ao usuário)
exports.activateTag = async (req, res) => {
  try {
    const { code, userId } = req.body;

    const tag = await prisma.tag.findUnique({
      where: { code }
    });

    if (!tag) {
      return res.status(404).json({ error: "Tag não existe" });
    }

    const updatedTag = await prisma.tag.update({
      where: { code },
      data: {
        userId,
        status: "ativa"
      }
    });

    res.json(updatedTag);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao ativar tag" });
  }
};

// buscar tag
exports.getTag = async (req, res) => {
  try {
    const { code } = req.params;

    const tag = await prisma.tag.findUnique({
      where: { code }
    });

    if (!tag) {
      return res.status(404).json({ error: "Tag não encontrada" });
    }

    res.json(tag);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar tag" });
  }
>>>>>>> e89eb6421e468d50ea3f326b51dc1eb7e3768805
};