const { okResponse, updateSuccessResponse, deleteSuccessResponse, serverErrorResponse } = require('generic-response');

const usersRepository = require('../../repositories/users/users');

const getAllUsers = async (req, res) => {
  try {
    let users = await usersRepository.getAllUsers();

    const response = okResponse(users);
    return res.status(response.status.code).json(response);
  } catch (error) {
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

const updateUsers = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const users = await usersRepository.updateUsers(id, data);

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
  updateUsers,
  deleteUsers,
};
