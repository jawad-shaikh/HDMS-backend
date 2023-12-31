const prisma = require('../../config/database.config');

const getAllUsers = async (filter) => {
  try {
    const users = await prisma.users.findMany({
      where: filter,
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return users;
  } catch (error) {
    throw error;
  }
};

const getSingleUsers = async (id) => {
  try {
    const users = await prisma.users.findFirst({
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: { id },
    });

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.users.findFirst({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
};

const createUsers = async (data) => {
  try {
    const user = await prisma.users.create({
      data,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUsers = async (id, data) => {
  try {
    const users = await prisma.users.update({ data, where: { id } });
    return users;
  } catch (error) {
    throw error;
  }
};

const deleteUsers = async (id) => {
  try {
    const users = await prisma.users.delete({ where: { id } });
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  getUserByEmail,
  createUsers,
  updateUsers,
  deleteUsers,
};
