import express from 'express';
import { loginController, registerController } from '../controllers/authController.mjs';
import { loginValidation, registerValidation } from '../validations/authValidations.mjs';
import { handleValidationErrors } from '../middlewares/errorsValidation.mjs';
import { userValidations } from '../validations/userValidations.mjs';

const router = express.Router();

router.post('/register', registerValidation, userValidations, handleValidationErrors, registerController);
router.post('/login', loginValidation, handleValidationErrors, loginController);
// router.delete('/logout')

export default router;