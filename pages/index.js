import Link from "next/link"

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(x => x).pop()
  return (
    <li>
      <Link href={`/pokemones/${id}`}>{pokemon.name}</Link>
    </li>
  )
}

export default function Pokemones({ pokemones }) {
  return (
    <div>
      <p data-testid='titulo'>Mi App de Pokemones</p>
      <ul>
        { pokemones.map(pokemon => <Pokemon key={pokemon.name} pokemon={pokemon} />)}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const responde = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await responde.json()

  return {
    props: { pokemones: data.results }
  }
}