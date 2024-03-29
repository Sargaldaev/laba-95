import express from 'express';
import { Error, HydratedDocument } from 'mongoose';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Cocktail';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import User from '../models/User';
import { ExistingUser, Cocktail as cocktail } from '../types';

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const cocktail = new Cocktail({
      user: user._id,
      name: req.body.name,
      recipe: req.body.recipe,
      ingredients: JSON.parse(req.body.ingredients),
      image: req.file && req.file.filename,
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
    const cocktail = await Cocktail.findById(id);
    return res.send(cocktail);
  } catch (e) {
    res.send(e);
  }
});

cocktailsRouter.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    const token = req.get('Authorization');
    const user = (await User.findOne({ token })) as ExistingUser;

    if (userId && user && userId === user._id.toString()) {
      const userCocktails = await Cocktail.find({ user: userId });

      return res.send(userCocktails);
    }

    const cocktails = await Cocktail.find();
    return res.send(cocktails);
  } catch {
    return res.sendStatus(500);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  const _id = req.params.id;

  try {
    const cocktail = await Cocktail.findByIdAndDelete(_id);
    if (!cocktail) {
      return res.status(404).send({ message: 'Cocktail not found' });
    }
    return res.send({ message: 'Cocktail deleted' });
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

cocktailsRouter.patch('/:id/setGrade', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const cocktail = (await Cocktail.findById(req.params.id)) as HydratedDocument<cocktail>;

    const userRating = cocktail.rating.findIndex(
      (item) => item.user.toString() === user._id.toString(),
    );

    if (userRating === -1) {
      cocktail.rating.push({ user: user._id, grade: req.body.grade });
    } else {
      cocktail.rating[userRating].grade = req.body.grade;
    }

    await cocktail.save();
    return res.send({ message: 'Rating set!' });
  } catch (e) {
    return next(e);
  }
});
export default cocktailsRouter;
