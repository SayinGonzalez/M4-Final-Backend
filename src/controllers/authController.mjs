// authController.js
import { login, register } from "../services/authService.mjs";

export const registerController = async (req, res, next) => {
  try {
    // console.log('Controller - Datos Recibidos:', req.body);
    const user = await register(req.body);

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente.",
      data: user
    });
  } catch (err) {
    console.log('Controller Catch ➜ Error en registro:', err);
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    const user = await login(identifier, password);
    console.log('User logueado ➜ ', user)
    
    res.status(200).json({
      success: true,
      message: "Usuario logueado exitosamente.",
      data: user
    });
  } catch (err) {
    console.log('Controller Catch ➜ Error en login:', err);
    next(err);
  }
};
