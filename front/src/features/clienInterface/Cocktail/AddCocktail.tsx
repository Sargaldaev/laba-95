import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import InputFile from '../../../components/InputFile/InputFile.tsx';
import { addCocktail } from '../../../store/cocktail/cocktailThunk.ts';
import { LoadingButton } from '@mui/lab';

interface CocktailState {
  user: string,
  name: string,
  recipe: string,
  ingredients: Ingredient[],
  image: File | null
}

interface Ingredient {
  name: string,
  amount: string,
  id: string
}

const AddCocktail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {createLoad} = useSelector((state: RootState) => state.cocktails);
  const {user} = useSelector((state: RootState) => state.user);

  const [state, setState] = useState<CocktailState>({
    user: '',
    name: '',
    recipe: '',
    ingredients: [],
    image: null
  });
  const [ingredientsState, setIngredientsState] = useState<Ingredient[]>([
    {
      name: '',
      amount: '',
      id: 'primary'
    }
  ]);
  const [imageExists, setImageExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const ingredientsChangeHandler = (id: string, name: string, amount: string) => {
    const ingredientsStateCopy = [...ingredientsState];
    const ingredient = ingredientsStateCopy.filter(ing => ing.id === id)[0];
    const ingredientIndex = ingredientsStateCopy.indexOf(ingredient);

    ingredientsStateCopy[ingredientIndex].name = name;
    ingredientsStateCopy[ingredientIndex].amount = amount;

    setIngredientsState(ingredientsStateCopy);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setImageExists(true);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onAddClick = () => {
    const ingredientsStateCopy = [...ingredientsState];

    ingredientsStateCopy.push({
      name: '',
      amount: '',
      id: nanoid()
    });
    setIngredientsState(ingredientsStateCopy);
  };

  const deleteIngredientBlock = (id: string) => {
    const newArray = ingredientsState.filter(ingredient => ingredient.id !== id);
    setIngredientsState(newArray);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !state.image) {
      setImageExists(false);
      return;
    }

    await dispatch(addCocktail({
      ...state,
      user: user._id,
      ingredients: ingredientsState
    }));
    setState({
      user: '',
      name: '',
      recipe: '',
      ingredients: [],
      image: null
    });
    navigate(`/myCocktails`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" mt={3}>
        Add new cocktail
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{mt: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="name"
              name="name"
              type="text"
              required
              value={state.name}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Paper
            sx={{
              padding: '10px', marginLeft: '16px',
              marginTop: '16px', width: '100%', boxSizing: 'border-box'
            }}
          >
            <Grid container spacing={1}>
              {
                ingredientsState.map((ingredient) => (
                  <Grid
                    item
                    sx={{
                      display: 'flex', justifyContent: 'space-between',
                      gap: '15px', alignItems: 'center'
                    }}
                    key={ingredient.id}
                  >
                    <TextField
                      label="name"
                      type="text"
                      size="small"
                      required
                      onChange={e => ingredientsChangeHandler(ingredient.id, e.target.value, ingredient.amount)}
                      value={ingredient.name}
                    />
                    <TextField
                      label="amount"
                      type="text"
                      size="small"
                      required
                      value={ingredient.amount}
                      onChange={e => ingredientsChangeHandler(ingredient.id, ingredient.name, e.target.value)}
                      style={{maxWidth: '100px'}}
                    />
                    <Button
                      onClick={() => deleteIngredientBlock(ingredient.id)}
                      disabled={ingredientsState.length === 1}
                      variant="outlined" color="error" style={{minWidth: '30px', padding: '5px 10px'}}>
                      <DeleteIcon/>
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
            <Button
              onClick={onAddClick}
              variant="outlined" color="primary"
              style={{minWidth: '30px', padding: '5px 10px', marginTop: 8}}
            >
              add new ingredient
            </Button>
          </Paper>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              required
              label="recipe"
              name="recipe"
              value={state.recipe}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFile label="image" name="image" onChange={fileInputChangeHandler}/>
          </Grid>
        </Grid>
        {
          !imageExists &&
          <Alert variant="outlined" severity="error" sx={{mt: 2}}>
            Image is required!
          </Alert>
        }
        <LoadingButton
          sx={{mt: 3, mb: 2}}
          type="submit"
          fullWidth
          loading={createLoad}
          variant="contained"
        >
          <span>Add</span>
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default AddCocktail;