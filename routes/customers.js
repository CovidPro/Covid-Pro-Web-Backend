const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const Customer = require("../models/customer.model");

router.post("/registerc", async (req, res) => {
  try {
    // Read email, password, ... from request body
    let { idNumber, password, customerName, customerAddress, contactNumber, email } = req.body;

    // validate
    if (!idNumber || !password || !passwordCheck || !shopOwner || !shopAddress || !contactNumber || !shopName)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!shopName) shopName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      shopName,
      shopOwner,
      shopAddress,
      contactNumber
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token",token);
    res.json({
      token,
      user: {
        id: user._id,
        shopName: user.shopName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const user = await Customer.findById(req.customer);
  res.json({
    idNumber: user.idNumber,
    customerName: user.customerName,
  });
});

router.get("/id", (req, res) => {
  Customer.findById(req.params.id)
      .then((book) => res.json(book))
      .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
});

// @route GET api/books
// @description Get all books
// @access Public
router.get("/getall", (req, res) => {
  Customer.find()
      .then((customers) => res.json(customers))
      .catch((err) => res.status(404).json({ nocustomersfound: "No Books found" }));
});

// @route GET api/books
// @description Get all status:customers
// @access Public
router.get("/getstatus", (req, res) => {
  Customer.find({ status : "customer"}, req.params.status)
      .then((customers) => res.json(customers))
      .catch((err) => res.status(404).json({ nocustomersfound: "No Books found" }));
});

router.get("/getstatu", (req, res) => {
  Customer.find({ $text: { $search: "me" } })
      .then((customers) => res.json(customers))
      .catch((err) => res.status(404).json({ nocustomersfound: "No Books found" }));
});

router.get("/getstatuse", (req, res) => {
  Customer.find({ status : "customer", _id: req.params.id})
      .then((customers) => res.json(customers))
      .catch((err) => res.status(404).json({ nocustomersfound: "No Books found" }));
});

module.exports = router;

//The following operation uses the $gt operator returns all the documents from the bios collection where birth is greater than new Date('1950-01-01'):
//
// db.bios.find( { birth: { $gt: new Date('1950-01-01') } } )