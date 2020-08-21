const express = require("express");
const { students, teachers } = require("../Models/StudentData");
//const teachers = require("../models/teachersData");
const Student = require("../Models/studentsModel");

const studentsRouter = express.Router();
const teachersRouter = express.Router();

const getAllStudents = async () => {
  const result = await Student.findAll();
  // TODO: Find a better way to get plain json
  return JSON.parse(JSON.stringify(result));
};

const getStudentById = async id => {
  const result = await Student.findByPk(id);
  // TODO: Find a better way to get plain json
  return JSON.parse(JSON.stringify(result));
};

const getAllTeachers = () => teachers;

const getTeachersById = id => {
  const teachers = getAllTeachers();
  return teachers.find(each => each.id === id);
};

const validStudent = studentobject => {
  // validation as task
  return true;
};

studentsRouter
  .get("/", async (req, res) => {
    try {
      res.status(200).json({
        data: await getAllStudents()
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal Server error");
    }
  })
  .post("/", async (req, res) => {
    try {
      if (req.body.firstName) {
        const result = await Student.create(req.body);
        console.log(result.get());
        res.status(200).json({
          message: "Student added Successfully",
          data: result.get()
        });
      } else {
        res.status(400).send("Invalid student");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })

  .put("/", (req, res) => {})

  /**
   * Individual student resource
   */

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const requiredStudent = await getStudentById(parseInt(id));
    if (requiredStudent) {
      res.status(200).json({ data: requiredStudent });
    } else {
      res.status(400).send("Student unavailable");
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Student.update(req.body, {
        where: {
          id
        }
      });
      if (result.length) {
        res.status(200).json({ message: "Student Updated!" });
      } else {
        res.status(400).send("Student unavailable");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validStudent = await Student.findByPk(id);
      if (validStudent) {
        await validStudent.destroy();
        res.status(200).json({
          message: "Student has been deleted"
        });
      } else {
        res.status(400).send("Invalid Student");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  });

const arrayBase = Object.keys(teachers[0]);

const validTeacher = teacherobject => {
  let teacherKeys = Object.keys(teacherobject);
  console.log(teacherobject, teacherKeys);
  if (teacherKeys.length > 0) {
    if (teacherKeys.includes("id") && teacherKeys.includes("firstName")) {
      if (teacherKeys.every(each => arrayBase.includes(each))) return true;
    }
    return false;
  }
  return false;
};

const Update = (arrays, splicingArray) => {
  const { id } = arrays;
  const teacherId = parseInt(id);
  let requiredTeacherIndex;
  for (let i = 0; i < splicingArray.length; i++) {
    if (splicingArray[i].id === teacherId) {
      requiredTeacherIndex = i;
      break;
    }
  }
  if (typeof requiredTeacherIndex !== "undefined") {
    const originalStudent = splicingArray[requiredTeacherIndex];
    const newTeacher = {
      ...originalStudent,
      ...arrays
    };
    splicingArray.splice(requiredTeacherIndex, 1, newTeacher);
  }
};

teachersRouter
  .get("/", (req, res) => {
    res.status(200).json({
      data: teachers
    });
  })
  .post("/", (req, res) => {
    if (req.body.id && req.body.firstName) {
      teachers.push(req.body);
      res.status(200).json({
        message: "Teacher added successfully",
        data: req.body
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })
  .put("/", (req, res) => {
    let arrayTeacher = req.body.filter(each => validTeacher(each));
    arrayTeacher.forEach(each => Update(each, teachers));
    res.send(teachers);
  })

  .put("/:id", (req, res) => {
    const { id } = req.params;
    const teacherId = parseInt(id);
    let requiredTeacherIndex;
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].id === teacherId) {
        requiredTeacherIndex = i;
        break;
      }
    }
    if (typeof requiredTeacherIndex !== "undefined") {
      const originalTeacher = teachers[requiredTeacherIndex];
      const newTeacher = {
        ...originalTeacher,
        ...req.body
      };
      students.splice(requiredTeacherIndex, 1, newTeacher);
      res.status(200).json({
        message: "Teacher details updated!",
        data: newTeacher
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })

  .get("/:id", (req, res) => {
    const { id } = req.params;
    const teachersId = parseInt(id);
    //console.log(teachersId);
    const requiredTeacher = teachers.find(each => each.id === teachersId);
    if (requiredTeacher) {
      res.status(200).json({
        data: requiredTeacher
      });
    } else {
      res.status(400).send("Teacher Unavailable");
    }
  })

  .get("/:id/students", (req, res) => {
    const { id } = req.params;
    const teachersId = parseInt(id);
    console.log(teachersId);
    const requiredTeacher = teachers.find(each => each.id === teachersId);
    const teachStudents = requiredTeacher.students;
    if (teachStudents) {
      res.status(200).json({
        data: teachStudents
      });
    } else {
      res.status(400).send("Students Unavailable");
    }
  })

  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const teachersId = parseInt(id);
    let requiredTeacherIndex;
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].id === teachersId) {
        requiredTeacherIndex = i;
        break;
      }
    }
    if (typeof requiredTeacherIndex !== "undefined") {
      teachers.splice(requiredTeacherIndex, 1);
      res.status(200).json({
        message: "Teahcer has been deleted"
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  });

module.exports = {
  studentsRouter,
  teachersRouter,
  getAllStudents,
  getAllTeachers,
  getStudentById,
  getTeachersById
};
