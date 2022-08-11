const { Employee } = require("../models")
const sequelize = require('sequelize')

class Controller{
    static home(req,res){

      let {filter} = req.query
      let {sort} = req.query
      // console.log(sort);
      // console.log(filter);

      const filterData = {where:{education:filter},order:[['name','ASC']]}
      const option = {order:[[sort,'ASC']]}


      if (filter) { //! DATA DI FILTER BERDASARKAN EDUCATION
        Employee.findAll(filterData).then(employee => {
          res.render('home',{employee})
      }).catch((err) => {
          // console.log(err);
          res.send(err)
      });
      return
      }
      if (sort) { //! SORTING BERDASARKAN NAME DAN POSITION
        Employee.findAll(option).then(employee => {
          res.render('home',{employee})
      }).catch((err) => {
          // console.log(err);
          res.send(err)
      });
      return
      } 
          //! INI TAMPILAN AWAL HOME
        Employee.findAll({order:[['name','ASC']]}).then(employee => {
            res.render('home',{employee})
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
        // Employee.findAll({order:[['age','DESC']]})
        // .then(employee => {
        //     res.render('home',{employee})
        // }).catch((err) => {
        //     // console.log(err);
        //     res.send(err)
        // });
    }
    static getAdd(req, res){
        Employee.findAll().then(employee => {
            // console.log(result);
            // res.send(result)
            res.render('add',{employee})
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }

    static posAdd(req, res) {
        // console.log(req.body);
        let {  name, position, education, email, phone_number, profile_picture,age } = req.body;
        Employee.create({ name, position, education, email, phone_number, profile_picture,age })
          .then((result) => {
            res.redirect("/");
          })
          .catch((err) => {
            res.send(err);
          });
      }

      static getEdit(req, res){
        console.log(req.params);
        let id = req.params.id
        Employee.findByPk(id).then(employee => {
            // console.log(result);
            // res.send(result)
            res.render('edit',{employee})
        }).catch(err => {
            // console.log(err);
            res.send(err)
        });
      }

      static editAdd(req, res) {
        // console.log(req.body);
        let {  name, position, education, email, phone_number, profile_picture,age } = req.body;
        Employee.update({ name, position, education, email, phone_number, profile_picture,age },{where:{id: req.params.id}})
          .then((result) => {
            res.redirect("/");
          })
          .catch((err) => {
            res.send(err);
          });
      }

      static delete(req, res){
        // let id = req.params.id
        Employee.destroy({where:{id: req.params.id}})
        .then((result) => {
          res.redirect('/')
        }).catch((err) => {
          res.send(err,'errors')
        });
      }
}

module.exports = Controller