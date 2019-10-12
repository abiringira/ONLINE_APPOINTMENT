const Center = require('../models/Center');

exports.createCenter = async (req, res) => {
  req.assert('city', 'city is required ').notEmpty();
  req.assert('district', 'district is required ').notEmpty();
  req.assert('name', 'name is required ').notEmpty();

  const center = new Center({
    city: req.body.city,
    district: req.body.district,
    address: req.body.address,
    name: req.body.name
  });

  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);

  try {
    let results = await center.save();
    res.json({ message: results.name + ' ' + ' Saved Successfully' });
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

exports.getCenter = async (req, res) => {
  try {
    let result = await Center.find({});
    res.json(result);
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

exports.editCenter = async (req, res) => {
  req.assert('address', 'please fill in new address');
  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);
  try {
    let results = await Center.updateOne(
      { _id: req.params.id },
      { $set: { address: req.body.address } }
    );

    res.json(results);
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

exports.deleteCenter = async (req, res) => {
  try {
    await Center.deleteOne({ _id: req.params.id });

    res.end();
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

//Pages

exports.createPageCenter = async (req, res) => {
  req.assert('city', 'city is required ').notEmpty();
  req.assert('district', 'district is required ').notEmpty();
  req.assert('name', 'name is required ').notEmpty();

  const center = new Center({
    city: req.body.city,
    district: req.body.district,
    address: req.body.address,
    name: req.body.name
  });

  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);

  try {
    let results = await center.save();
    res.json({ message: results.name + ' ' + ' Saved Successfully' });
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

exports.getPageCenter = async (req, res) => {
  try {
    let result = await Center.find({});
    res.json(result);
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

exports.editPageCenter = async (req, res) => {
  req.assert('address', 'please fill in new address');
  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);
  try {
    let results = await Center.updateOne(
      { _id: req.params.id },
      { $set: { address: req.body.address } }
    );

    res.json(results);
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};

exports.deletePageCenter = async (req, res) => {
  try {
    await Center.deleteOne({ _id: req.params.id });

    res.end();
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
};
