import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getFullInfo } from '../../../store/cocktail/cocktailThunk.ts';
import { Link, useParams } from 'react-router-dom';
import { Box, CircularProgress, Rating, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { apiUrl } from '../../../constants.ts';
import Button from '@mui/material/Button';
import axiosApi from '../../../axiosApi.ts';


const CocktailFullInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [rate, setRate] = useState<number>(0);
  const {id} = useParams() as { id: string };
  const {cocktailFullInfo, fetchLoadFullInfo} = useSelector((state: RootState) => state.cocktails);
  const {user} = useSelector((state: RootState) => state.user);


  useEffect(() => {
    if (id && !cocktailFullInfo) {
      dispatch(getFullInfo(id));
    }

    if (cocktailFullInfo && user) {
      const newRate = cocktailFullInfo.rating.find((item) => item.user === user._id);
      if (newRate) {
        setRate(newRate.grade);
      }
    }
  }, [id, dispatch, user, cocktailFullInfo]);



  return cocktailFullInfo && (
    <>
      {fetchLoadFullInfo ? (
        <CircularProgress/>
      ) : (
        <>
          <Button component={Link} to={`/`} size="small">
            Back
          </Button>
          <Box display="flex">
            <Box>
              <CardMedia
                sx={{height: 570, width: 470}}
                image={apiUrl + cocktailFullInfo.image}
              />
            </Box>

            <Box marginLeft={3}>
              <Typography sx={{fontWeight: 700, fontSize: 17}} gutterBottom variant="h5">
              <span style={{fontWeight: 700, display: 'inline-block', marginRight: 1, color: 'green'}}>
                Cocktail name:
              </span>
                {cocktailFullInfo.name}
              </Typography>

              <Typography gutterBottom component="div">
              <span style={{fontWeight: 700, color: 'green', marginRight: 5}}>
                Recipe:
              </span>
                {cocktailFullInfo.recipe}
              </Typography>

              <Typography gutterBottom component="div">
              <span style={{fontWeight: 700, color: 'green'}}>
                Ingredients :
              </span>

                {cocktailFullInfo.ingredients.map(item => (
                  <Box key={item.name} display={'flex'}>
                    <Typography key={item._id} width={150}>
                    <span style={{display: 'inline-block', fontWeight: 700, marginRight: 5, color: 'blue'}}>
                      name:
                    </span>
                      {item.name}
                    </Typography>

                    <Typography key={item._id}>
                    <span style={{display: 'inline-block', color: 'tomato', fontWeight: 700, marginRight: 5}}>
                      amount:
                    </span>
                      {item.amount}
                    </Typography>
                  </Box>
                ))}

                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ marginTop: '20px', display: 'flex', gap: 1 }}
                >
                  Rating:
                  <span style={{ fontSize: '1.35rem' }}>
                  {cocktailFullInfo.rating && cocktailFullInfo.rating.length
                    ? (
                      cocktailFullInfo.rating.reduce((acc, value) => {
                        return acc + value.grade;
                      }, 0) / cocktailFullInfo.rating.length
                    ).toFixed(2) // Округление до двух знаков после запятой
                    : '0'} ({cocktailFullInfo.rating ? cocktailFullInfo.rating.length : '0'} votes)
                </span>
                </Typography>
              </Typography>

              <Typography variant="h5" sx={{ mt: 2, display: 'flex' }}>
                Rate:
                <Rating
                  name="half-rating"
                  value={rate}
                  onChange={async (_, newValue) => {
                    if (newValue !== null) {
                      try {
                        await axiosApi.patch(`cocktails/${cocktailFullInfo._id}/setGrade`, {
                          grade: newValue,
                        });
                        await dispatch(getFullInfo(cocktailFullInfo._id));
                        setRate(newValue);
                      } catch (e) {
                        console.error(e);
                      }
                    }
                  }}
                />
              </Typography>

            </Box>
          </Box>
        </>
      )}
    </>
  );

};

export default CocktailFullInfo;
