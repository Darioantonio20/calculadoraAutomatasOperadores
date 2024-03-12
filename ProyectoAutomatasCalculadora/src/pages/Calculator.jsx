import React, { useState } from 'react';
import { Parser, Grammar } from 'nearley';
import { ParserRules, ParserStart } from '../gramatica/grammar.js';
import "../assets/style/Calculator.css";

const compiledGrammar = { ParserRules, ParserStart };

function Calculator() {
    const [input, setInput] = useState("");
    const [lexResult, setLexResult] = useState([]);

    const handleClick = (e) => {
        setInput(input + e.target.name);
    }

    const calculate = () => {
        try {
            const parser = new Parser(Grammar.fromCompiled(compiledGrammar));
            const result = parser.feed(input).results[0];
            setInput(result.toString());
            setLexResult(parser.results); // Almacenar el resultado del análisis léxico
        } catch (error) {
            setInput("Error");
        }
    }

    const clear = () => {
        setInput("");
        setLexResult([]); // Limpiar el resultado del análisis léxico
    }

    return ( 
        <>
            <div className="container">
                <div id="cal-body">
                    <div className="input">
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                    </div>
                    <div>
                        <p>Lexical Analysis: {lexResult.join(' ')}</p>
                    </div>
                    <div style={{paddingTop: '3rem'}}>
                        <div className="buttons">
                            <button name="1" onClick={handleClick}>1</button>
                            <button name="2" onClick={handleClick}>2</button>
                            <button name="3" onClick={handleClick}>3</button>
                            <button name="+" onClick={handleClick}>+</button>
                        </div>
                        <div className="buttons">
                            <button name="4" onClick={handleClick}>4</button>
                            <button name="5" onClick={handleClick}>5</button>
                            <button name="6" onClick={handleClick}>6</button>
                            <button name="-" onClick={handleClick}>-</button>
                        </div>
                        <div className="buttons">
                            <button name="7" onClick={handleClick}>7</button>
                            <button name="8" onClick={handleClick}>8</button>
                            <button name="9" onClick={handleClick}>9</button>
                            <button name="*" onClick={handleClick}>*</button>
                        </div>
                        <div className="buttons">
                            <button name="." onClick={handleClick}>.</button>
                            <button name="0" onClick={handleClick}>0</button>
                            <button name="(" onClick={handleClick}>(</button>
                            <button name=")" onClick={handleClick}>)</button>
                        </div>
                        <div className="buttons">
                            <button onClick={clear}>CL</button>
                            <button style={{ width: "18rem"}} onClick={calculate}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Calculator;