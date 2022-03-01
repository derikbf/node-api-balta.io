'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')
// const azure = require('azure-storage');
// const guid = require('guid')
// var config = require('../config')

exports.get = async(req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Failed to process request!'
    });
  }
}

exports.getBySlug = async (req, res, next) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
      res.status(500).send({
        message: 'Failed to process request!'
    });
  }
}

exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Failed to process request!'
    });
  }
}

exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Failed to process request!'
    });
  }
}

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'Min 3 caracters');
  contract.hasMinLen(req.body.slug, 3, 'Min 3 caracters');
  contract.hasMinLen(req.body.description, 3, 'Min 3 caracters');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  
  // INICIO - CADASTRO DE IMAGEM PELO AZURE
  // try {
  //   // cria o blob service
  //   const blobSvc = azure.createBlobService(config.containerConnectionString);

  //   let filename = guid.raw().toString() + '.jpg';
  //   let rawdata = req.body.image;
  //   let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  //   let type = matches[1];
  //   let buffer = new Buffer(matches[2], 'base64');
    
  //   // Salvar a image
  //   await blobSvc.createBlockBlobFromText('name-image-storage', filename, buffer, {
  //     contentType: type
  //   }, function (error, result, response) {
  //     if (error) {
  //       filename = 'default-product.png'
  //     }
  //   })

  // try {
  //   await repository.create({
  //     title: req.body.title,
  //     slug: req.body.slug,
  //     description: req.body.description,
  //     price: req.body.price,
  //     tags: req.body.tags
  //     // image: 'http://urldeimage' + filename
  //   });
  // FIM - CADASTRO DE IMAGEM PELO AZURE

  try {
    await repository.create(req.body);
    res.status(201).send({
        message: "Product registered successfully!"});
    } catch (e) {
      res.status(500).send({
        message: 'Failed to process request!'
      });
    }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
        message: 'Product successfully updated'});
  } catch (e) {
    res.status(500).send({
      message: 'Failed to process request!'
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id)
        res.status(200).send({
          message: 'Product successfully removed!'});
  } catch (e) {
    res.status(500).send({
      message: 'Failed to process request!'
    });
  }
};
