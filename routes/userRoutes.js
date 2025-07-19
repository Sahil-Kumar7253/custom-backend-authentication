const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const { restrictTo } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', controller.handleUserRegistration);
router.post('/login', controller.handleUserLogin);
router.get('/', controller.handleHome);

// Protected routes
router.get('/users', restrictTo(["USER"]),controller.handleGetAllUsers);

router
  .route('/:id')
  .get(controller.handleGetUserById)
  .patch(controller.handleUpdateUser)
  .delete(controller.handleDeleteUser);

module.exports = router;