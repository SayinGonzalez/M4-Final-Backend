import express from 'express';
import {
  deleteUserController,
  editUserController,
  findUserByIdController,
  listUsersController
} from '../controllers/userController.mjs';
import { handleValidationErrors } from '../middlewares/errorsValidation.mjs';
import { idValidation } from '../validations/commonValidations.mjs';
import { userValidations } from '../validations/userValidations.mjs';
import { authenticateToken, hasPermission } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/',
  authenticateToken,
  hasPermission(["read"], ["users"]),
  listUsersController
);

router.get('/id/:id',
  authenticateToken,
  hasPermission(["read"], ["profile", "users"]),
  idValidation,
  handleValidationErrors,
  findUserByIdController
);

router.put('/edit/:id',
  authenticateToken,
  hasPermission(["update"], ["profile"]),
  idValidation,
  userValidations,
  handleValidationErrors,
  editUserController
);

router.delete('/delete/:id',
  authenticateToken,
  hasPermission(["delete"], ["profile", "users"]),
  idValidation,
  handleValidationErrors,
  deleteUserController
);

export default router;