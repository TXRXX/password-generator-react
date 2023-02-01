import React, { useState } from "react";
import Checkbox from "./components/Checkbox";
import "./App.css";

const App = () => {
    const [password, setPassword] = useState({
        length: 10,
        uppercase: true,
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
        const symbolsArray = ["!", "@", "#", "$", "&", "*", "+", "-"];

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
            <div className="wrap__left">
                <div className="wrap__checkbox">
                    <label>Length</label>
                    <input
                        type="range"
                        min="5"
                        max="20"
                        className="range__slider"
                        value={password.length}
                        onChange={(e) => setPasswordLength(e.target.value)}
                    />
                    <span>{password.length}</span>
                </div>
                <div className="wrap__checkbox">
                    <div className="wrap__label">
                        <label>Uppercase</label>
                        <label className="example__text">ex. (ABCDE)</label>
                    </div>
                    <Checkbox
                        value={password.uppercase}
                        onChange={handleChangeUpperCase}
                    />
                </div>
                <div className="wrap__checkbox">
                    <div className="wrap__label">
                        <label>Lowercase</label>
                        <label className="example__text">ex. (abcde)</label>
                    </div>
                    <Checkbox
                        value={password.lowercase}
                        onChange={handleChangeLowerCase}
                    />
                </div>
                <div className="wrap__checkbox">
                    <div className="wrap__label">
                        <label>Numbers</label>
                        <label className="example__text">ex. (01234)</label>
                    </div>
                    <Checkbox
                        value={password.numbers}
                        onChange={handleChangeNumbers}
                    />
                </div>
                <div className="wrap__checkbox">
                    <div className="wrap__label">
                        <label>Symbols</label>
                        <label className="example__text">ex. (!@#$&)</label>
                    </div>
                    <Checkbox
                        value={password.symbols}
                        onChange={handleChangeSymbols}
                    />
                </div>
                <button className="gen__button" onClick={generatePassword}>
                    GENERATE
                </button>
            </div>

            <div className="wrap__password">
                <div>
                    <h1>GENERATE YOUR SECURE PASSWORD</h1>
                </div>
                <div className="wrap__password__input">
                    <input
                        type="text"
                        value={handleText}
                        autoComplete="off"
                        placeholder="Password will be appears here"
                        className="password__input"
                        onChange={(e) => setHandleText(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (handleText.length > 0) {
                                navigator.clipboard.writeText(handleText);
                                setCopie(true);
                                setInterval(() => {
                                    setCopie(false);
                                }, 2000);
                            }
                        }}
                        className={
                            copie
                                ? "copy__button copy__button__active"
                                : "copy__button"
                        }
                    >
                        <img src="/copy.png" alt="" />
                    </button>
                    {copie ? <span className="tooltip">Copied !</span> : null}
                </div>
                <div className="wrap__pattern">
                    <img src="/lock.png" alt="" className="icon icon1" />
                    <img src="/heart.png" alt="" className="icon icon2" />
                    <img src="/swear.png" alt="" className="icon icon3" />
                    <img src="/shield.png" alt="" className="icon icon4" />
                    <img src="/lock.png" alt="" className="icon icon5" />
                    <img src="/github.png" alt="" className="icon icon6" />
                    <img src="/snapchat.png" alt="" className="icon icon7" />
                    <img src="/twitch.png" alt="" className="icon icon8" />
                    <img src="/twitter.png" alt="" className="icon icon9" />
                    <img src="/heart-shape-outline.png" alt="" className="icon icon10" />
                    <img src="/home.png" alt="" className="icon icon11" />
                    <img src="/unlock.png" alt="" className="icon icon12" />
                    <img src="/code.png" alt="" className="icon icon13" />
                    <img src="/warn.png" alt="" className="icon icon14" />
                    <img src="/happy.png" alt="" className="icon icon15" />
                    <img src="/telegram.png" alt="" className="icon icon16" />
                </div>
            </div>
        </div>
    );
};

export default App;
