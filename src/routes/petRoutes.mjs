import express from 'express';
import { handleValidationErrors } from "../middlewares/errorsValidation.mjs";
import { petValidations } from "../validations/petValidations.mjs";
import { idValidation } from '../validations/commonValidations.mjs';
import {
  addPetController,
  deletePetController,
  editPetController,
  findPetByIdController,
  findPetsByCategoryController,
  getPetsByQueryController,
  getUserPetsController,
  listPetsController
} from "../controllers/petController.mjs";
import { authenticateToken, hasPermission } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

//  Rutas para todo público
router.get('/category/:category', findPetsByCategoryController);
router.get('/id/:id', idValidation, findPetByIdController);
// --------------------------

router.get('/',
  authenticateToken,
  hasPermission(["read"], ["pets"]),
  listPetsController
);

router.get('/my-pets',
  authenticateToken,
  hasPermission(["read"], ["pets"]),
  getUserPetsController
)

router.get('/search',
  authenticateToken,
  hasPermission(["read"], ["pets"]),
  getPetsByQueryController
)

router.post('/add',
  authenticateToken,
  hasPermission(["create"], ["pets"]),
  petValidations,
  handleValidationErrors,
  addPetController
);

router.put('/edit/:id',
  authenticateToken,
  hasPermission(["update"], ["pets"]),
  idValidation,
  petValidations,
  handleValidationErrors,
  editPetController
);

router.delete('/delete/:id',
  authenticateToken,
  hasPermission(["delete"], ["pets"]),
  idValidation,
  handleValidationErrors,
  deletePetController
);

export default router;