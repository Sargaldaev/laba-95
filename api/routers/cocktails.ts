import express from 'express';
import { Error } from 'mongoose';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Cocktail';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const cocktailsRouter = express.Router();


cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
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


cocktailsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const cocktail = await Cocktail.findById(id).populate('user', 'displayName');
    return res.send(cocktail);
  } catch (e) {
    res.send(e);
  }
});

cocktailsRouter.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    return res.send(cocktails);
  } catch (e) {
    res.send(e);
  }
});


cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  const _id = req.params.id;

  try {
    const cocktail = await Cocktail.findByIdAndDelete(_id);
    if (!cocktail) {
      return res.status(404).send({message: 'Cocktail not found'});
    }
    return res.send({message: 'Cocktail deleted'});
  } catch (e) {
    return res.send(e);
  }
});


cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  const _id = req.params.id;

  try {
    const cocktail = await Cocktail.findOne({ _id });

    if (!cocktail) {
      return res.status(404).send({ message: 'Cocktail not found' });
    }
    if (cocktail.isPublished === false) {
      await Cocktail.findOneAndUpdate({ _id }, { isPublished: true });
      return res.send({ message: 'Cocktail updated' });
    } else {
      await Cocktail.findOneAndUpdate({ _id }, { isPublished: false });
      return res.send({ message: 'Cocktail updated' });
    }
  } catch (e) {
    return res.send(e);
  }
});

export default cocktailsRouter;
