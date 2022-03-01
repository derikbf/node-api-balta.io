'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5');

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'Min 3 caracters');
  contract.isEmail(req.body.email, 'Email invalid');
  contract.hasMinLen(req.body.password, 6, 'Min 6 caracters');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });
    res.status(201).send({
        message: "Customer registered successfully!"});
    } catch (e) {
      res.status(500).send({
        message: 'Failed to process request!'
      });
    } 
};
