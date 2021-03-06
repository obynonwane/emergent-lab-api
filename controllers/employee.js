const Employee = require("../models/Employee");

exports.getAllEmployees = (req, res, next) => {
  Employee.findAll({ attributes: { exclude: ["password", "createdAt", "updatedAt"] } })
    .then((result) => {
      return res.json({
        data: result,
        status: true,
        statusCode: 200,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addEmployees = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const phone = req.body.phone;
  const role = req.body.role;
  const password = req.body.password;

  Employee.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    role: role,
    password: password,
  })
    .then((result) => {
      return res.json({
        status: true,
        data: result,
        statusCode: 200,
        message: "Employee Added Succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEmployeeById = (req, res, next) => {
  const empId = req.params.id;
  Employee.findByPk(empId)
    .then((result) => {
      return res.json({
        status: true,
        data: result,
        statusCode: 200,
        message: "Employee Added Succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateEmployee = (req, res, next) => {
  const empId = req.params.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const phone = req.body.phone;


  Employee.findByPk(empId)
    .then((employee) => {
      if (!employee) {
        return res.json({
          status: false,
          data: {},
          statusCode: 400,
          message: "Employee with the given ID do not exist",
        });
      }
      employee.firstname = firstname;
      employee.lastname = lastname;
      employee.email = email;
      employee.phone = phone;
      return employee.save();
    })
    .then((result) => {
      return res.json({
        status: true,
        data: result,
        statusCode: 200,
        message: "Employee updated Succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteEmployeeById = (req, res, next) => {
  const empId = req.params.id;
  Employee.findByPk(empId)
    .then((product) => {
      if (!product) {
        return res.json({
          status: false,
          data: {},
          statusCode: 400,
          message: "Employee with the given ID does not exist",
        });
      }
      return product.destroy();
    })
    .then((result) => {
      return res.json({
        status: true,
        data: result,
        statusCode: 200,
        message: "Employee deleted Succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
