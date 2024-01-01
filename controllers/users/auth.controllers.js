const jwt = require('jsonwebtoken');
const { unauthorizedResponse, okResponse, serverErrorResponse } = require('generic-response');

const userRepository = require('../../repositories/users/users');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      const response = unauthorizedResponse('Incorrect email or password. Please try again.');
      return res.status(response.status.code).json(response);
    }

    if (password !== user.password) {
      const response = unauthorizedResponse('Incorrect email or password. Please try again.');
      return res.status(response.status.code).json(response);
    }

    const jwtPayload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      employeeNumber: user.employeeNumber,
      idNumber: user.idNumber,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

    const response = okResponse({ token, userData: jwtPayload }, 'Login Success!');
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const register = async (req, res) => {
  const { email } = req.body;

  try {
    let existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
      const response = unauthorizedResponse('Email address is already registered. Please use a different email.');
      return res.status(response.status.code).json(response);
    }

    let user = await userRepository.createUsers(req.body);

    const response = okResponse(user, 'Registration successful!');
    return res.status(response.status.code).json(response);
  } catch (error) {
    console.log(error);
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  login,
  register,
};
