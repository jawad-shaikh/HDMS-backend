const {
  okResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  serverErrorResponse,
} = require('generic-response');

const departmentsRepository = require('../../repositories/departments/departments');

const getAllDepartments = async (req, res) => {
  const { hod, start, end } = req.query;

  if (hod) {
    filter.headOfDepartment = {
      id: hod,
    };
  }
  if (start && end) {
    filter.updatedAt = {
      gte: new Date(start),
      lte: new Date(end),
    };
  }

  try {
    let departments = await departmentsRepository.getAllDepartments();

    const response = okResponse(departments);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const getSingleDepartment = async (req, res) => {
  const id = Number(req.params.id);

  try {
    let department = await departmentsRepository.getSingleDepartment(id);

    const response = okResponse(department);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const createDepartment = async (req, res) => {
  const data = req.body;

  try {
    const department = await departmentsRepository.createDepartment(data);

    const response = createSuccessResponse(department);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const updateDepartment = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const department = await departmentsRepository.updateDepartment(id, data);

    const response = updateSuccessResponse(department);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const deleteDepartment = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const department = await departmentsRepository.deleteDepartment(id);

    const response = deleteSuccessResponse(department);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllDepartments,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
