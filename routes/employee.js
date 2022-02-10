const express = require("express");
const router = express.Router();

const {
    getAllEmployees,
    addEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployeeById
} = require("../controllers/employee");

router.route("/").get(getAllEmployees).post(addEmployees)
router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployeeById);

module.exports = router;
