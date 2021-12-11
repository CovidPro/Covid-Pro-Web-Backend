const router = require("express").Router();
const Customer = require("../models/customer.model");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
  localStorage.setItem('myFirstKey', 0);
}

// @route GET api/customers
// @description Get all customers
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
  console.log("getstatus");
  Customer.find({ status : "customer"}, req.params.status)
      .then((customers) => res.json(customers))
      .catch((err) => res.status(404).json({ nocustomersfound: "No Books found" }));
});


// Send "Customer" to http://localhost:8000/api/msg
router.post("/msg", (req, res) => {
  console.log("Sending Massage....");
  console.log(req.body);

  //if req.body.msg2 is not empty
  if(req.body.msg2 !== undefined){
    console.log("Sending Massage2....");
    console.log(req.body.msg2);
    msg23 = req.body.msg2;
    localStorage.setItem('myFirstKey', msg23);
    //send message to the server
    //io.emit("msg", req.body.msg2);
  }

  console.log(localStorage.getItem('myFirstKey'));

  setTimeout(function () {
    console.log("5 secondes");
    localStorage.setItem('myFirstKey', 0);
    console.log(localStorage.getItem('myFirstKey'));
  }, 15000);
  console.log("now");

  // TODO : Setup another timer in frondend to check if the message is sent or not
  // The backend localStorage will be cleared after 15 seconds (to 0)
  // So after that another repond can be save
  // In frontend run a timer and loop over to check if the message is sent or not
  // It triggered move to next step

  //console.log("remsg " + remsg);

  try {
    res.json({
      msg : "Customer",
      msg2 : localStorage.getItem('myFirstKey'),
      },
    );
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route POST api/customers
// @description Delete customer
// @access Public
router.delete("/delete", async (req, res) => {
  console.log(req.body);
  console.log("idNum " + req.body.id)
  console.log("Del");
  try {
    var id = req.body.id;
    const deletedCustomer = await Customer.findByIdAndDelete({_id:id});
    res.json(deletedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route POST api/customers
// @description Create customer
// @access Public
router.post("/cre", (req, res) => {
  console.log(req.body.email);
  Customer.findOne({ email: req.body.email }).then((customer) => {
    if (customer) {
      return res.status(400).json("Email already exists");
    } else {
      const newCustomer = new Customer({
        name: req.body.name,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        nic: req.body.nic,
        idNumber: req.body.idNumber,
        address: req.body.address,
        contactNo: req.body.contactNo,
        updatedQRAt: req.body.updatedQRAt,
        notification: req.body.notification,
        positive: req.body.positive,
        timestamp: req.body.timestamp,
        notificationRead: req.body.notificationRead,
      });

      newCustomer.save().then((customer) => res.json(customer));
      console.log("New Customer Added");
    }
  });
});



module.exports = router;

//The following operation uses the $gt operator returns all the documents from the bios collection where birth is greater than new Date('1950-01-01'):
// db.bios.find( { birth: { $gt: new Date('1950-01-01') } } )
