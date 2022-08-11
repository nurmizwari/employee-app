'use strict';
const fs = require('fs')
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = JSON.parse(fs.readFileSync('./data/employees.json')).map((el)=>{
    return {
      name:el.name,
      position:el.position,
      education:el.education,
      email:el.email,
      phone_number: el.phone_number,
      profile_picture:el.profile_picture,
      createdAt: new Date(),
      updatedAt: new Date(),

    }
   })
   return queryInterface.bulkInsert("Employees", data, {});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Employees", null, {});
  }
};
