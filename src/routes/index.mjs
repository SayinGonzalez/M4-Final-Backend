import express from 'express';
import petRoutes from './petRoutes.mjs'
import userRoutes from './userRoutes.mjs'
import authRoutes from './authRoutes.mjs'
import errorHandler from '../middlewares/errorsCatch.mjs';

const router = express.Router();

router.use('/pets', petRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes)

//  Middleware para los errores del catch
router.use(errorHandler);

export default router;