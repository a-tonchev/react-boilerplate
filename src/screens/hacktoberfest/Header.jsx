import Grid from '@/components/inputs/CustomGrid';
import { Button } from '@/components/ui/button';

const Header = ({
  imageUrl, title, buttonLink, buttonText, items,
}) => (
  <div>
    <div
      className={[
        'h-[500px] relative overflow-hidden rounded-[15px]',
        'flex flex-col justify-center items-center gap-4',
      ].join(' ')}
    >
      <img className="absolute top-0 left-0 h-full w-full object-cover -z-1" src={imageUrl} alt="" />
      <h1 className="uppercase text-white text-4xl font-bold">{title}</h1>
      <Button variant="default" size="lg" className="uppercase" asChild>
        <a href={buttonLink}>{buttonText}</a>
      </Button>
    </div>
    <Grid
      justifyContent="spaceEvenly"
      className="-translate-y-[50px] border-x-[15px] border-transparent"
      container
      spacing={{ xs: 1, md: 4 }}
    >
      {items.map((item, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <div className="rounded-[15px] uppercase text-center relative border">
            <div
              className={[
                'absolute top-1 right-1 p-1 bg-success',
                'text-success-foreground text-sm w-min',
              ].join(' ')}
            >
              {item.price}
            </div>
            <img className="object-contain h-[150px] w-full" src={item.imageUrl} alt={item.title} />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Header;
