import { render, screen } from '@testing-library/react'
import { getStaticProps } from '../pages/index'
import Index from '../pages/index'

describe('Index', () => {
    describe('Component', () => {
        it('se renderiza', () => {
            const { getByTestId } = render(
                <Index pokemones={[{ name: 'Chanchito', url: '/pokemon/detalle/1' }]} />
            )

            const paragraph = getByTestId('titulo')

            expect(paragraph).toBeInTheDocument()
            
            const chanchito = screen.getByText('Chanchito')

            expect(chanchito).toBeInTheDocument()

            const url = chanchito.getAttribute('href')
            expect(url).toEqual('/pokemones/1')
        })
    })

    describe('getStaticProps', () => {
        it('return pokemones', async () => {
            global.fetch = jest.fn()
            .mockImplementation(url => {
                expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=151')
                console.log(url)
                return new Promise(resolve => {
                    resolve({
                        json: () => Promise.resolve({
                            results: 'lista de pokemones'
                        })
                    })
                })
            })
            const { props } = await getStaticProps()
            expect(props.pokemones).toBe('lista de pokemones')
        })
    })
})