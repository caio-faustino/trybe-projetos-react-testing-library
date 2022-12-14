import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testa o componente <About.js />.', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    // Acessar os elementos da Tela
    renderWithRouter(<About />);
    // Interagir com os elementos
    const aboutText = screen.getByRole('heading', { name: 'About Pokédex' });
    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const p2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    const pokedeximage = screen.getByRole('img');
    // Fazer os testes
    expect(aboutText).toBeInTheDocument();
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
    expect(pokedeximage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
