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
  listPetsController
} from "../controllers/petController.mjs";

const router = express.Router();

router.get('/', listPetsController);
router.get('/category/:category', findPetsByCategoryController);
router.get('/id/:id', idValidation, findPetByIdController);
router.post('/add', petValidations, handleValidationErrors, addPetController);
router.put('/edit/:id', idValidation, petValidations, handleValidationErrors, editPetController);
router.delete('/delete/:id', idValidation, deletePetController);

export default router;