const Admin = require("../Models/adminModel");

const AdminSeed = () => {
  Admin.sync({ force: true })
    .then(() => {
      return Admin.create({
        email: "test@gmail.com",
        password: "123456"
      });
    })
    .then((result) => {
      console.log(result.get());
    })
    .catch(console.error);
};

AdminSeed();
