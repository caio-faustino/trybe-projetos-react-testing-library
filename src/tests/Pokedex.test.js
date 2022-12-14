import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />.', () => {
  const buttonName = 'Próximo Pokémon';
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);

    const encounteredText = screen.getByRole('heading', { name: 'Encountered Pokémon' });

    expect(encounteredText).toBeInTheDocument();
  });

  describe('Testa se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado.', () => {
    it('O botão deve conter o texto "Próximo Pokémon".', () => {
      renderWithRouter(<App />);

      const proxPokemonButton = screen.getByRole('button', { name: buttonName });

      expect(proxPokemonButton).toBeInTheDocument();
    });

    it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', () => {
      renderWithRouter(<App />);

      const proxPokemonButton = screen.getByRole('button', { name: buttonName });
      for (let i = 0; i < 8; i += 1) {
        userEvent.click(proxPokemonButton);
      }
      const dragonair = screen.getByText('Dragonair');
      expect(dragonair).toBeInTheDocument();
    });

    it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista.', () => {
      renderWithRouter(<App />);

      const proxPokemonButton = screen.getByRole('button', { name: buttonName });
      for (let i = 0; i < 9; i += 1) {
        userEvent.click(proxPokemonButton);
      }
      const pikachu = screen.getByText('Pikachu');
      expect(pikachu).toBeInTheDocument();
    });
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getAllByText('Pikachu');
    expect(pikachu.length).toBe(1);
  });

  describe('Testa se a Pokédex tem os botões de filtro.', () => {
    it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
      renderWithRouter(<App />);
      const typeButton = screen.getAllByTestId('pokemon-type-button');
      expect(typeButton).toHaveLength(7);
    });

    it('O texto do botão deve corresponder ao nome do tipo, ex.: "Psychic".', () => {
      renderWithRouter(<App />);
      const eletricButton = screen.getByRole('button', { name: 'Electric' });
      const fireButton = screen.getByRole('button', { name: 'Fire' });
      const bugButton = screen.getByRole('button', { name: 'Bug' });
      const poisonButton = screen.getByRole('button', { name: 'Poison' });
      const psychicButton = screen.getByRole('button', { name: 'Psychic' });
      const normalButton = screen.getByRole('button', { name: 'Normal' });
      const dragonButton = screen.getByRole('button', { name: 'Dragon' });

      expect(eletricButton).toBeInTheDocument();
      expect(fireButton).toBeInTheDocument();
      expect(bugButton).toBeInTheDocument();
      expect(poisonButton).toBeInTheDocument();
      expect(psychicButton).toBeInTheDocument();
      expect(normalButton).toBeInTheDocument();
      expect(dragonButton).toBeInTheDocument();
    });

    it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
      renderWithRouter(<App />);

      const allButton = screen.getByRole('button', { name: 'All' });
      const pikachu = screen.getByText('Pikachu');

      userEvent.click(allButton);

      expect(allButton).toBeInTheDocument();
      expect(pikachu).toBeInTheDocument();
    });
  });
});
