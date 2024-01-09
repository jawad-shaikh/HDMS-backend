const prisma = require('../../config/database.config');

const getAllDepartments = async (filter) => {
  try {
    const departments = await prisma.departments.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        headOfDepartment: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: filter,
    });
    return departments;
  } catch (error) {
    throw error;
  }
};

const getSingleDepartment = async (id) => {
  try {
    const department = await prisma.departments.findFirst({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        headOfDepartment: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: { id },
    });
    return department;
  } catch (error) {
    throw error;
  }
};

const createDepartment = async (data) => {
  try {
    const department = await prisma.departments.create({ data });
    return department;
  } catch (error) {
    throw error;
  }
};

const updateDepartment = async (id, data) => {
  try {
    const department = await prisma.departments.update({ data, where: { id } });
    return department;
  } catch (error) {
    throw error;
  }
};

const deleteDepartment = async (id) => {
  try {
    const department = await prisma.departments.delete({ where: { id } });
    return department;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDepartments,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
