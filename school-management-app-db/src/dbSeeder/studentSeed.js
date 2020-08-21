const Student = require("../Models/studentsModel");

const studentData = [
  {
    firstName: "Arun",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Ram",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Magesh",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Suresh",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  }
];

exports.studentSeeder = async teacherId => {
  // `force: true` will clear existing tables
  await Student.sync({ force: true });

  studentData.forEach(async student => {
    try {
      const result = await Student.create({
        ...student,
        teacherId
      });
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};
