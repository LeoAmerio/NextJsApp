import { Layout } from "@/components/layouts";
import { useRouter } from "next/router";

interface Props {
  pokemon: any;
}

const PokemonPage = () => {
  const router = useRouter();
  console.log(router.query);
  
  return (
    <Layout title="Any pokemon">
      <h1>Hi W</h1>
    </Layout>
  );
};

export default PokemonPage;
