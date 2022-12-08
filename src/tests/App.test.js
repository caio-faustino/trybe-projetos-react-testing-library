import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 01', () => {
  it('App.test.js contempla 100% dos casos de uso criados pelo Stryker', () => {
    // Acessar os elementos da Tela
    const { history } = renderWithRouter(<App />);
    // Interagir com os elementos
    const textoHome = screen.getByRole('link', { name: 'Home' });
    const textoAbout = screen.getByRole('link', { name: 'About' });
    const textoFavorito = screen.getByRole('link', { name: 'Favorite Pokémon' });
    // Fazer os testes
    // Teste se o topo da aplicação contém um conjunto fixo de links de navegação
    expect(textoHome).toBeInTheDocument();
    expect(textoAbout).toBeInTheDocument();
    expect(textoFavorito).toBeInTheDocument();

    // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação
    userEvent.click(textoHome);
    expect(history.location.pathname).toBe('/');

    // Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação
    userEvent.click(textoAbout);
    expect(history.location.pathname).toBe('/about');

    // Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação
    userEvent.click(textoFavorito);
    expect(history.location.pathname).toBe('/favorites');
  });
});
