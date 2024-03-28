import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('cocktails');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2, user3] = await User.create(
    {
      email: 'tim@gmail.com',
      displayName: 'Tim Smith',
      role: 'admin',
      password: '123',
      avatar: 'fixtures/user1.jpeg',
      token: crypto.randomUUID(),
    },
    {
      email: 'roby@gmail.com',
      displayName: 'Roby Li',
      role: 'user',
      password: '123',
      avatar: 'fixtures/user2.jpeg',
      token: crypto.randomUUID(),
    },
    {
      email: 'paul@gmail.com',
      displayName: 'Paul',
      role: 'user',
      password: '123',
      avatar: 'fixtures/user3.jpeg',
      token: crypto.randomUUID(),
    },
  );

  await Cocktail.create(
    {
      user: user1._id,
      name: 'Aperol Syringe',
      recipe: 'Fill a wine glass with ice. Pour 100 ml prosecco and 100 ml aperol into a glass.  Add a splash ' +
        'of soda and stir with a cocktail spoon. Decorate with a slice of orange',
      ingredients: [
        {name: 'Aperol', amount: '100 ml'},
        {name: 'Prosekko', amount: '100 ml'},
        {name: 'Soda', amount: '20 ml'},
        {name: 'Orange', amount: '40 g'},
        {name: 'Ice', amount: '60 g'}
      ],
      image: 'fixtures/aperolNew.png',
      isPublished: true,
    },
    {
      user: user1._id,
      name: 'Mojito',
      recipe: 'Put 3 slices of lime in a highball and crush it with a mudler. Take 10 mint leaves in one hand ' +
        'and slap them with the other hand. Put the mint in the highball. He filled a glass with crushed ice ' +
        'to the top. Add 15 ml sugar syrup and 50 ml white rum. Share the soda to the top and gently stir ' +
        'with a cocktail spoon. Add some crushed ice. Garnish with a sprig of mint and a slice of lime',
      ingredients: [
        {name: 'White Rum', amount: '50 ml'},
        {name: 'Sugar', amount: '15 ml'},
        {name: 'Soda', amount: '100 ml'},
        {name: 'Lime', amount: '3 g'},
        {name: 'Mint', amount: '80 g'},
        {name: 'Ice', amount: '200 g'}
      ],
      image: 'fixtures/Mojito.jpg',
      isPublished: true,
    },
    {
      user: user1._id,
      name: 'Margarita',
      recipe: 'Make a salty rim on the margarita glass. Pour 30 ml lime juice, 10 ml sugar syrup, 25 ml triple' +
        ' sec liqueur and 50 ml silver tequila into the shaker. Fill the shaker with ice cubes and shake.' +
        ' Pour through a strainer into a chilled margarita glass. Decorate with a lime circle',
      ingredients: [
        {name: 'Silver Tequila', amount: '50 ml'},
        {name: 'Fruko Schulz', amount: '25 ml'},
        {name: 'Sugar', amount: '10 ml'},
        {name: 'Lime Juice', amount: '30 ml'},
        {name: 'Lime', amount: '10 g'},
        {name: 'Salt', amount: '2 g'},
        {name: 'Ice', amount: '200 g'},
      ],
      image: 'fixtures/Margarita.jpg',
      isPublished: true,
    },
    {
      user: user1._id,
      name: 'Negroni',
      recipe: 'Fill a wine glass with ice. Pour 100 ml prosecco and 100 ml aperol into a glass.  Add a splash ' +
        'of soda and stir with a cocktail spoon. Decorate with a slice of orange',
      ingredients: [
        {name: 'Dry Gin', amount: '30 ml'},
        {name: 'Red Vermouth', amount: '30 ml'},
        {name: 'Red Bitter', amount: '30 ml'},
        {name: 'Orange peel', amount: '40 g'},
        {name: 'Ice', amount: '120 g'}
      ],
      image: 'fixtures/Negroni.jpg',
      isPublished: false,
    },
    {
      user: user1._id,
      name: 'Jin Tonik',
      recipe: 'Fill the highball with ice cubes to the top. Pour 50 ml gin. Add the tonic to the top and ' +
        'gently stir with a cocktail spoon. Decorate with lime mugs',
      ingredients: [
        {name: 'Dry Gin', amount: '50 ml'},
        {name: 'Tonik', amount: '150 ml'},
        {name: 'Lime', amount: '20 g'},
        {name: 'Ice', amount: '180 g'},
      ],
      image: 'fixtures/Gin-and-Tonic.jpg',
      isPublished: false,
    },
    {
      user: user2._id,
      name: 'Daiquiri',
      recipe: 'Pour 30 ml lime juice, 15 ml sugar syrup and 60 ml white rum into a shaker. Fill the shaker ' +
        'with ice cubes and shake. Pour through a strainer into a chilled champagne saucer',
      ingredients: [
        {name: 'White Rum', amount: '60 ml'},
        {name: 'Sugar', amount: '15 ml'},
        {name: 'Lime Juice', amount: '30 ml'},
        {name: 'Ice', amount: '200 g'}
      ],
      image: 'fixtures/Daiquiri.jpg',
      isPublished: true,
    },
    {
      user: user2._id,
      name: 'Blue Lagoon',
      recipe: 'Fill the hurricane with ice cubes to the top. Pour 20 ml blue curacao liqueur and 50 ml' +
        ' vodka. Share the sprite to the top and gently stir with a cocktail spoon .Decorate with a ' +
        'slice of pineapple',
      ingredients: [
        {name: 'Royal Vodka', amount: '50 ml'},
        {name: 'Blue Curacao Liqueur', amount: '20 ml'},
        {name: 'Sprite', amount: '150 ml'},
        {name: 'Pineapple', amount: '30 g'},
        {name: 'Ice', amount: '200 g'}
      ],
      image: 'fixtures/Blue-Lagoon.jpg',
      isPublished: true,
    },
    {
      user: user2._id,
      name: 'Tequila Sunrise',
      recipe: 'Fill a wine glass with ice. Pour 100 ml prosecco and 100 ml aperol into a glass.  Add a splash ' +
        'of soda and stir with a cocktail spoon. Decorate with a slice of orange',
      ingredients: [
        {name: 'Aperol', amount: '100 ml'},
        {name: 'Prosekko', amount: '100 ml'},
        {name: 'Soda', amount: '20 ml'},
        {name: 'Orange', amount: '40 g'},
        {name: 'Ice', amount: '60 g'}
      ],
      image: 'fixtures/Tequila-Sunrise.jpg',
      isPublished: false,
    },
    {
      user: user2._id,
      name: 'Sex on the Beach',
      recipe: 'Fill the sling with ice cubes to the top. Pour cranberry juice 40 ml, pineapple juice' +
        ' 40 ml, peach liqueur 25 ml and vodka 50 ml into a shaker. Fill the shaker with ice cubes and ' +
        'shake. Pour over the strainer into the sling. Decorate with a piece of pineapple and a cocktail' +
        ' cherry on a skewer',
      ingredients: [
        {name: 'Royal Vodka', amount: '50 ml'},
        {name: 'Peach liqueur', amount: '25 ml'},
        {name: 'Cranberry Juice', amount: '40 ml'},
        {name: 'Pineapple Juice', amount: '40 ml'},
        {name: 'Pineapple', amount: '15 g'},
        {name: 'Red cherry', amount: '5 g'},
        {name: 'Ice', amount: '350 g'}
      ],
      image: 'fixtures/sex-beach-cocktail.jpg',
      isPublished: false,
    },
    {
      user: user2._id,
      name: 'B-52',
      recipe: 'Pour 15 ml of coffee liqueur into the stack. Using a cocktail spoon, lay a layer of Irish' +
        ' cream 15 ml and a layer of triple sec liqueur 15 ml. Set it on fire, arm yourself with tubes' +
        'and treat!',
      ingredients: [
        {name: 'Coffee liqueur', amount: '15 ml'},
        {name: 'Irish Cream', amount: '15 ml'},
        {name: 'Triple sec', amount: '15 ml'}
      ],
      image: 'fixtures/B52-Shot.jpg',
      isPublished: false,
    },
    {
      user: user3._id,
      name: 'Cosmopolitan',
      recipe: 'Pour 10 ml lime juice, 50 ml cranberry juice, 20 ml triple sec liqueur and 40 ml citrus vodka' +
        ' into the shaker. Fill the shaker with ice cubes and shake. Pour through a strainer into a chilled' +
        ' cocktail glass. Light a burner over the cocktail and squeeze the oil from the orange peel on it',
      ingredients: [
        {name: 'Citrus vodka Tsarskaya', amount: '40 ml'},
        {name: 'Triple sec', amount: '20 ml'},
        {name: 'Cranberry Juice', amount: '50 ml'},
        {name: 'Lime Juice', amount: '10 ml'},
        {name: 'Orange peel', amount: '1 g'},
        {name: 'Ice', amount: '200 g'}
      ],
      image: 'fixtures/cosm.jpg',
      isPublished: false,
    },
    {
      user: user3._id,
      name: 'Cuba Libre',
      recipe: 'Fill the highball with ice cubes to the top. Pour 10 ml lime juice and 50 ml golden rum.' +
        ' Share the Cola to the top and gently stir with a cocktail spoon. Decorate with lime mugs',
      ingredients: [
        {name: 'Golden rum', amount: '50 ml'},
        {name: 'Lime juice', amount: '10 ml'},
        {name: 'Cola', amount: '140 ml'},
        {name: 'Lime', amount: '20 g'},
        {name: 'Ice', amount: '180 g'}
      ],
      image: 'fixtures/cuba-libre.jpg',
      isPublished: false,
    },
    {
      user: user3._id,
      name: 'Bellini',
      recipe: 'Put 4 tablespoons of peach puree in a mixing glass. Add lemon juice 10 ml, sugar syrup 10 ml and' +
        ' prosecco 50 ml. Fill a glass with ice cubes and gently stir with a cocktail spoon. Pour through a' +
        ' strainer and strainer into a flute glass. A share of prosecco to the top. Garnish with a slice of peach',
      ingredients: [
        {name: 'Prosecco', amount: '100 ml'},
        {name: 'Sugar', amount: '10 ml'},
        {name: 'Lemon juice', amount: '10 ml'},
        {name: 'Peach puree', amount: '20 g'},
        {name: 'Peach', amount: '15 g'},
        {name: 'Ice', amount: '300 g'}
      ],
      image: 'fixtures/bellini.jpg',
      isPublished: true,
    },
    {
      user: user3._id,
      name: 'Manhattan',
      recipe: 'Pour 25 ml red vermouth and 50 ml bourbon into a mixing glass. Add angostura bitter 1 dash.' +
        ' Fill a glass with ice cubes and stir with a cocktail spoon. Pour through a strainer into a chilled' +
        ' cocktail glass. Decorate with cocktail cherries on a skewer',
      ingredients: [
        {name: 'Bourbon', amount: '50 ml'},
        {name: 'Red Vermouth', amount: '25 ml'},
        {name: 'Angostura bitter', amount: '1 ml'},
        {name: 'Cocktail cherry red', amount: '5 g'},
        {name: 'Ice', amount: '300 g'}
      ],
      image: 'fixtures/manhattan.jpg',
      isPublished: true,
    },
    {
      user: user3._id,
      name: 'Screwdriver',
      recipe: 'Fill Collins with ice cubes to the top. Pour 50 ml of vodka. Add orange juice to the top and' +
        ' gently stir with a cocktail spoon. Decorate with a slice of orangee',
      ingredients: [
        {name: 'Royal Vodka', amount: '50 ml'},
        {name: 'Orange juice', amount: '150 ml'},
        {name: 'Orange', amount: '30 g'},
        {name: 'Ice', amount: '180 g'}
      ],
      image: 'fixtures/screwdriver.jpg',
      isPublished: true,
    }
  );

  await db.close();
};

run().catch(console.error);
