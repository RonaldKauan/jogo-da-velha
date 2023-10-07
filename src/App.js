import { useCallback, useEffect, useState } from "react";
import './App.css';

function App() {
    const [estado, setEstado] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [jogada, setJogada] = useState('X')
    const [ganhador, setGanhador] = useState('');
    const [jogadas, setJogadas] = useState(0);

    const preencheCampo = (linhaIndex, colunaIndex) => {
        setEstado((prev) => {
            prev[linhaIndex][colunaIndex] = jogada;

            return prev;
        });

        if (jogada === 'X') {
            setJogada('O');
        } else {
            setJogada('X');
        }

        setJogadas(prev => prev + 1);
    }

    const verificaGanhou = useCallback(() => {
        const estadoClone = [...estado];
        
        let x_ganhou_linha;
        let x_ganhou_coluna;
        let x_ganhou_diagonal_primaria;
        let x_ganhou_diagonal_secundaria;
        let o_ganhou_linha;
        let o_ganhou_coluna;
        let o_ganhou_diagonal_primaria;
        let o_ganhou_diagonal_secundaria;
        
        for (let i = 0; i < 3; i++) {
            x_ganhou_linha = 0;
            x_ganhou_coluna = 0;
            x_ganhou_diagonal_primaria = 0;
            x_ganhou_diagonal_secundaria = 0;
            o_ganhou_linha = 0;
            o_ganhou_coluna = 0;
            o_ganhou_diagonal_primaria = 0;
            o_ganhou_diagonal_secundaria = 0;

            for (let j = 0; j < 3; j++) {
                if (estadoClone[i][j] === 'X') x_ganhou_linha += 1;
                if (estadoClone[j][i] === 'X') x_ganhou_coluna += 1;
                if (estadoClone[j][j] === 'X') x_ganhou_diagonal_primaria += 1;
                if (estadoClone[j][2 - j] === 'X') x_ganhou_diagonal_secundaria += 1;
                if (estadoClone[i][j] === 'O') o_ganhou_linha += 1;
                if (estadoClone[j][i] === 'O') o_ganhou_coluna += 1;
                if (estadoClone[j][j] === 'O') o_ganhou_diagonal_primaria += 1;
                if (estadoClone[j][2 - j] === 'O') o_ganhou_diagonal_secundaria += 1;
            }

            if (x_ganhou_linha === 3 || x_ganhou_coluna === 3 || x_ganhou_diagonal_primaria === 3 || x_ganhou_diagonal_secundaria === 3) {
                setGanhador('X');
                break;
            } 
            if (o_ganhou_linha === 3 || o_ganhou_coluna === 3 || o_ganhou_diagonal_primaria === 3 || o_ganhou_diagonal_secundaria === 3) {
                setGanhador('O');    
                break;
            }
            if (jogadas === 9){
                setGanhador('-');
            }
        }
    }, [estado, jogadas]);

    useEffect(() => {
        verificaGanhou();
    }, [jogada, verificaGanhou]);
    
    return (
        <div className="pagina">
            {ganhador ? ganhador !== '-' ? (
                <h1 data-testid="mensagem">O GANHADOR FOI O: {ganhador}</h1>
            ) : (
                <h1 data-testid="mensagem">DEU VELHA: NÃO HOUVE GANHADOR!</h1>
            ) : null}

            <div className="conteudo-container"> 
                {estado.map((linha, lIndex) => (
                    linha.map((item, cIndex) => (
                        <div 
                            className="conteudo-borda"
                            data-testid="conteudo"
                            onClick={() => item === '' && ganhador === '' && preencheCampo(lIndex, cIndex)}
                            key={cIndex}
                        >
                            {item}
                        </div>
                    ))
                ))}
            </div>

            {ganhador && (
                <button onClick={() => {
                    setEstado([['', '', ''], ['', '', ''], ['', '', '']]);
                    setGanhador('');
                    setJogadas(0);
                }}>
                    Reiniciar jogo
                </button>
            )}
        </div>
    );
}

export default App;

