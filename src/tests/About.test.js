import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 02', () => {
  it('About.test.js contempla 100% dos casos de uso criados pelo Stryker', () => {
    // Acessar os elementos da Tela
    const { history } = renderWithRouter(<App />);
    // Interagir com os elementos
    act(() => {
      history.push('/about');
    });
    // Fazer os testes
    const sinopse = screen.getByRole('heading', { name: 'About Pokédex' });
    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const p2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    const pokedeximage = screen.getByRole('img');

    expect(sinopse).toBeInTheDocument();
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
    expect(pokedeximage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
