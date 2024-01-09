const {
  okResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  serverErrorResponse,
} = require('generic-response');

const departmentsRepository = require('../../repositories/departments/departments');

const getAllDepartments = async (req, res) => {
  const { hodId, start, end } = req.query;

  const filter = {};

  if (hodId && hodId !== '0') {
    filter.headOfDepartment = {
      id: +hodId,
    };
  }
  if (start && start !== '0' && end && end !== '0') {
    filter.updatedAt = {
      gte: new Date(start),
      lte: new Date(end),
    };
  }

  try {
    let departments = await departmentsRepository.getAllDepartments(filter);

    const response = okResponse(departments);
    return res.status(response.status.code).json(response);
  } catch (error) {
    console.log(error);
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
