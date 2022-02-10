const Sequelize = require("sequelize");

const sequelize = require("../utils/mysqlConnect");

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    default: Date.now,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    default: Date.now,
    allowNull: false,
  },
});

module.exports = Employee;


// const db = require("../utils/database");

// module.exports = class Employee {
//   constructor(id, firstname, lastname, email, password) {
//     this.firstname = firstname;
//     this.lastname = lastname;
//     this.email = email;
//     this.password = password;
//   }
//   static fetchAll() {
//     return db.execute("SELECT * FROM employees");
//   }

//   save() {
//     return db.execute(
//       "INSERT INTO employees ( firstname, lastname, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
//       [this.firstname, this.lastname, this.email, this.password, new Date(), new Date()]
//     );
//   }

//   static findById(id){
//     return db.execute('SELECT * FROM employees WHERE employees.id = ?', [id])
//   }
// };
