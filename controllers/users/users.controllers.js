const {
  okResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  serverErrorResponse,
  createSuccessResponse,
  badRequestResponse,
} = require('generic-response');

const usersRepository = require('../../repositories/users/users');
const departmentsRepository = require('../../repositories/departments/departments');

const getAllUsers = async (req, res) => {
  const { role, departmentId, start, end } = req.query;

  try {
    const filter = {};

    if (role && role !== '0') {
      filter.role = role;
    }
    if (departmentId && departmentId !== '0') {
      filter.departmentId = +departmentId;
    }
    if (start && start !== '0' && end && end !== '0') {
      filter.updatedAt = {
        gte: new Date(start),
        lte: new Date(end),
      };
    }

    let users = await usersRepository.getAllUsers(filter);

    const response = okResponse(users);
    return res.status(response.status.code).json(response);
  } catch (error) {
    console.log(error);
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const getSingleUsers = async (req, res) => {
  const id = Number(req.params.id);

  try {
    let user = await usersRepository.getSingleUsers(id);

    const response = okResponse(user);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const createUsers = async (req, res) => {
  const data = req.body;

  try {
    const existingUser = await usersRepository.getUserByEmail(data.email);

    if (existingUser) {
      const response = badRequestResponse('Email already in use.');
      return res.status(response.status.code).json(response);
    }

    const user = await usersRepository.createUsers(data);

    if (data.departmentId) {
      const user = await departmentsRepository.updateDepartment({ id: data.departmentId, headOfDepartmentId: user.id });
    }

    const response = createSuccessResponse(user);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const updateUsers = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const users = await usersRepository.updateUsers(id, data);

    if (data.departmentId) {
      const user = await departmentsRepository.updateDepartment({ id: data.departmentId, headOfDepartmentId: user.id });
    }

    const response = updateSuccessResponse(users);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const deleteUsers = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const users = await usersRepository.deleteUsers(id);

    const response = deleteSuccessResponse(users);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
