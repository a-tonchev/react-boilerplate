import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@/components/inputs/CustomGrid';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  main: {
    height: '500px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
  },
  mainTitle: {
    textTransform: 'uppercase',
    color: '#fff',
  },
  mainImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-1',
  },
  mainButton: {
    textTransform: 'uppercase',
  },
  grid: {
    transform: 'translateY(-50px)',
    borderRight: '15px solid transparent',
    borderLeft: '15px solid transparent',
  },
  card: {
    borderRadius: '15px',
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'relative',
  },
  cardPrice: {
    width: 'min-content',
    position: 'absolute',
    top: '5px',
    right: '5px',
    padding: '5px',
    backgroundColor: 'var(--theme-palette-success-main)',
    color: 'var(--theme-palette-success-contrastText)',
  },
  cardImg: {
    objectFit: 'contain',
  },
};

const Header = ({
  imageUrl, title, buttonLink, buttonText, items,
}) => {
  const classes = useClasses(styles);
  return (
    <div>
      <Stack
        className={classes.main}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <img className={classes.mainImg} src={imageUrl} alt="" />
        <Typography className={classes.mainTitle} variant="h1">
          {title}
        </Typography>
        <Button
          className={classes.mainButton}
          variant="contained"
          href={buttonLink}
          size="large"
        >
          {buttonText}
        </Button>
      </Stack>
      <Grid
        justifyContent="spaceEvenly"
        className={classes.grid}
        container
        spacing={{ xs: 1, md: 4 }}
      >
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card} variant="outlined" key={i}>
              <Paper
                elevation={0}
                className={classes.cardPrice}
                color="success"
              >
                {item.price}
              </Paper>
              <CardMedia
                className={classes.cardImg}
                image={item.imageUrl}
                component="img"
                height="150"
              />
              <CardContent>
                <Typography variant="h2">{item.title}</Typography>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Header;
