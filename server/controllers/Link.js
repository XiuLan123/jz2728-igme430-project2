const models = require('../models');

const {
  Link,
} = models;

const makerPage = (req, res) => {
  Link.LinkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.render('app', {
      csrfToken: req.csrfToken(),
      links: docs,
    });
  });
};

const makeLink = (req, res) => {
  if (!req.body.name || !req.body.url || !req.body.desc) {
    return res.status(400).json({
      error: 'RAWR! Name and url and desc are required',
    });
  }

  const linkData = {
    name: req.body.name,
    url: req.body.url,
    desc: req.body.desc,
    owner: req.session.account._id,
  };

  const newLink = new Link.LinkModel(linkData);
  const linkPromise = newLink.save();

  linkPromise.then(() => res.json({
    redirect: '/maker',
  }));
  linkPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Link already exists.',
      });
    }
    return res.status(400).json({
      error: 'An error occurred',
    });
  });
  return linkPromise;
};

const getLinks = (request, response) => {
  const req = request;
  const res = response;
  return Link.LinkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.json({
      links: docs,
    });
  });
};

const deleteLink = (request, response) =>{
  const req = request;
  const res = response;

  return Link.LinkModel.findAndDelete(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.json({
      links: docs,
    });
  });
};

module.exports.makerPage = makerPage;
module.exports.getLinks = getLinks;
module.exports.make = makeLink;
module.exports.deleteLink = deleteLink;
