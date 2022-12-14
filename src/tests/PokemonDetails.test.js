import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />.', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/25');
    });

    const pokemonDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    const summary = screen.getByRole('heading', { name: 'Summary' });
    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    const locations = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    const map = screen.getAllByRole('img', { name: 'Pikachu location' });

    expect(pokemonDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(locations).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
    expect(map[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(map[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
