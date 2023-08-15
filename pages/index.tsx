import { GetStaticProps, NextPage } from "next";
import { Button, Card, Grid, Row, Text } from "@nextui-org/react";

import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemons";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log(pokemons);

  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={2} justify='flex-start' >
        {pokemons.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </Grid.Container>
      <Button color="gradient">Click Me</Button>
    </Layout>
  );
};


// This code only execute from the server side & only can be in a page
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemon: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
  }));

  return {
    props: {
      pokemons: pokemon,
    },
  };
};

export default HomePage;
