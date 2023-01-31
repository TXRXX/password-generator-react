import React, { useState } from "react";
import Checkbox from "./components/Checkbox";

const App = () => {
    const [password, setPassword] = useState({
        length: 5,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
    });

    const [handleText, setHandleText] = useState("");
    const [copie, setCopie] = useState(false);

    const handleChangeUpperCase = () => {
        setPassword({
            ...password,
            uppercase: !password.uppercase,
        });
    };

    const handleChangeLowerCase = () => {
        setPassword({
            ...password,
            lowercase: !password.lowercase,
        });
    };

    const handleChangeNumbers = () => {
        setPassword({
            ...password,
            numbers: !password.numbers,
        });
    };

    const handleChangeSymbols = () => {
        setPassword({
            ...password,
            symbols: !password.symbols,
        });
    };

    const setPasswordLength = (val) => {
        setPassword({
            ...password,
            length: val,
        });
    };

    function generatePassword() {
        const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const symbolsArray = [
            "!",
            "@",
            "#",
            "$",
            "&",
            "*",
            "+",
            "-",
        ];

        const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
        const lowerCaseLetters = characterCodes.map((code) =>
            String.fromCharCode(code)
        );

        const upperCaseLetters = lowerCaseLetters.map((letter) =>
            letter.toUpperCase()
        );

        const { length, uppercase, lowercase, numbers, symbols } = password;

        const generateTheWord = (
            length,
            uppercase,
            lowercase,
            numbers,
            symbols
        ) => {
            const availableCharacters = [
                ...(uppercase ? upperCaseLetters : []),
                ...(lowercase ? lowerCaseLetters : []),
                ...(numbers ? numbersArray : []),
                ...(symbols ? symbolsArray : []),
            ];
            const shuffleArray = (array) =>
                array.sort(() => Math.random() - 0.5);
            const characters = shuffleArray(availableCharacters).slice(
                0,
                length
            );
            setHandleText(characters.join(""));
            return characters;
        };

        generateTheWord(length, uppercase, lowercase, numbers, symbols);
    }

    return (
        <div className="container">
            <div className="wrap__password">
                <input
                    type="text"
                    value={handleText}
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) => setHandleText(e.target.value)}
                />
                <button
                    onClick={() => {
                        if (handleText.length > 0) {
                            navigator.clipboard.writeText(handleText);
                            setCopie(true);
                            setInterval(() => {
                                setCopie(false);
                            }, 1000);
                        }
                    }}
                >
                    {copie ? "Copied" : "Copy"}
                </button>
            </div>
            <div className="wrap__checkbox">
                <label>Length</label>
                <input
                    type="range"
					min="8"
					max="30"
                    value={password.length}
                    onChange={(e) => setPasswordLength(e.target.value)}
                />
				<span>{password.length}</span>
            </div>
            <div className="wrap__checkbox">
                <label>Upper Case</label>
                <Checkbox
                    value={password.uppercase}
                    onChange={handleChangeUpperCase}
                />
            </div>
            <div className="wrap__checkbox">
                <label>Lower Case</label>
                <Checkbox
                    value={password.lowercase}
                    onChange={handleChangeLowerCase}
                />
            </div>
            <div className="wrap__checkbox">
                <label>Number Case</label>
                <Checkbox
                    value={password.numbers}
                    onChange={handleChangeNumbers}
                />
            </div>
            <div className="wrap__checkbox">
                <label>Symbolic Case</label>
                <Checkbox
                    value={password.symbols}
                    onChange={handleChangeSymbols}
                />
            </div>
            <button onClick={generatePassword}>GEN</button>
        </div>
    );
};

export default App;
