const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /compounds?page=1
const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const take = 10;
  const skip = (page - 1) * take;

  try {
    const [data, total] = await Promise.all([
      prisma.compound.findMany({ skip, take }),
      prisma.compound.count()
    ]);

    res.json({ data, total });
  } catch (error) {
    res.status(500).send('Failed to fetch compounds');
  }
};

// GET /compounds/:id
const getOne = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const compound = await prisma.compound.findUnique({ where: { id } });
    if (!compound) return res.status(404).send('Compound not found');
    res.json(compound);
  } catch (error) {
    res.status(500).send('Failed to fetch compound');
  }
};

// PUT /compounds/:id
const update = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const compound = await prisma.compound.update({
      where: { id },
      data: req.body
    });
    res.json(compound);
  } catch (error) {
    res.status(404).send('Compound not found or update failed');
  }
};

// POST /compounds
const create = async (req, res) => {
  const { name, image, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const compound = await prisma.compound.create({
      data: {
        name,
        image,
        description
      }
    });
    res.status(201).json(compound);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create compound' });
  }
};

const createMAny=async (req,res)=>
{
const compoundArray=req.body;

 const compound=await prisma.compound.createMany({
    data:compoundArray
  });
  res.status(201).json(compound);

}

module.exports = {
  getAll,
  getOne,
  update,
  create,
  createMAny
};