import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />.', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Testa se é renderizado a estrela de favorito.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritePokemon);
    const starImage = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });

    expect(favoritePokemon).toBeChecked();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
    expect(starImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
