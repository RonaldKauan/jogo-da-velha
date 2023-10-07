import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('deveria falhar se não encontrar os 9 quadradros clicaveis', () => {
  render(<App />);

  const lugaresParaJogar = screen.queryAllByTestId('conteudo');
  
  expect(lugaresParaJogar).toHaveLength(9);
});
