const prisma = require('../../config/database.config');

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};

const getSingleUsers = async (id) => {
  try {
    const users = await prisma.users.findFirst({ where: { id } });
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
      select: {
        id: true,
        firstName: true,
        lastName: true,
        employeeNumber: true,
        idNumber: true,
        email: true,
        role: true,
      },
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
