import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

test('deveria falhar se não encontrar os 9 quadradros clicaveis', () => {
  render(<App />);

  const lugaresParaJogar = screen.queryAllByTestId('conteudo');
  
  expect(lugaresParaJogar).toHaveLength(9);
});

test('deveria falhar se o X não ganhar', () => {
  render(<App />);

  const lugaresParaJogar = screen.queryAllByTestId('conteudo');
  
  act(() => {
    userEvent.click(lugaresParaJogar[0]);
  });

  act(() => {
    userEvent.click(lugaresParaJogar[3]);
  });

  act(() => {
    userEvent.click(lugaresParaJogar[1]);
  })
  act(() => {
    userEvent.click(lugaresParaJogar[6]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[2]);
  })

  const mensagem = screen.getByTestId('mensagem');

  expect(mensagem).toBeInTheDocument();
  expect(mensagem).toHaveTextContent('O GANHADOR FOI O: X');
});

test('deveria falhar se o O não ganhar', () => {
  render(<App />);

  const lugaresParaJogar = screen.queryAllByTestId('conteudo');
  
  act(() => {
    userEvent.click(lugaresParaJogar[1]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[0]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[2]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[4]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[5]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[8]);
  })

  const mensagem = screen.getByTestId('mensagem');

  expect(mensagem).toBeInTheDocument();
  expect(mensagem).toHaveTextContent('O GANHADOR FOI O: O');
});

test('deveria falhar se o jogo não der velha', () => {
  render(<App />);

  const lugaresParaJogar = screen.queryAllByTestId('conteudo');
  
  act(() => {
    userEvent.click(lugaresParaJogar[0]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[2]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[1]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[3]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[5]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[4]);
  })

  act(() => {
    userEvent.click(lugaresParaJogar[6]);
  })
  act(() => {
    userEvent.click(lugaresParaJogar[8]);
  })
  act(() => {
    userEvent.click(lugaresParaJogar[7]);
  })

  const mensagem = screen.getByTestId('mensagem');

  expect(mensagem).toBeInTheDocument();
  expect(mensagem).toHaveTextContent('DEU VELHA: NÃO HOUVE GANHADOR!');
});