import express from 'express';
import { Error } from 'mongoose';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Cocktail';
import auth, { RequestWithUser } from '../middleware/auth';

const cocktailsRouter = express.Router();


cocktailsRouter.post('/',auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const cocktail = new Cocktail({
      user: user._id,
      name: req.body.name,
      recipe: req.body.recipe,
      ingredients: JSON.parse(req.body.ingredients),
      image: req.file ? req.file.filename : null,
    });

    await cocktail.save();

    return res.send(cocktail);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(422).send(error);
    }
    return next(error);
  }
});

export default cocktailsRouter;
