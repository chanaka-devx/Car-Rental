import express from 'express';
const router = express.Router();

// Simulated database response
const user = {
  name: "chanaka mc",
  email: "chanakamaduranga2001@gmail.com",
  mobile: "+94 76 478 0661",
};

// Define the /users route
router.get("/users", (req, res) => {
  res.json(user); // Respond with the user data
});

export default router;
