import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import { Layout } from "@/components/layouts";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log(pokemons);

  return (
    <Layout title="Listado de Pokemons">
      <ul>
        {pokemons.map((poke) => (
          <>
            <li key={poke.id}>#{poke.id} | {poke.name}</li>
            {/* <li>{poke.img}</li> */}
          </>
        ))}
      </ul>
      <Button color="gradient">Click Me</Button>
    </Layout>
  );
};

import { GetStaticProps } from "next";
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import Image from "next/image";

// This code only execute from the server side & only can be in a page
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemon: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dram_world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons: pokemon,
    },
  };
};

export default HomePage;
