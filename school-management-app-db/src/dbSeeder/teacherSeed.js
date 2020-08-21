const Teacher = require("../Models/teachersModel");
const { studentSeeder } = require("./studentSeed");

const newTeacher = {
  firstName: "red",
  lastName: "raj",
  age: 24,
  gender: "Male",
  email: "test@gmail.com"
};

const teacherSeeder = async () => {
  await Teacher.sync({ force: true });

  try {
    const result = await Teacher.create(newTeacher);
    console.log(result.get());
    const { id } = result.get();
    studentSeeder(id);
  } catch (e) {
    console.error(e);
  }
};

teacherSeeder();
