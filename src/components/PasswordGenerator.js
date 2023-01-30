import React, { useState } from "react";
import { PasswordService } from "../services/PasswordService";

const PasswordGenerator = () => {
    let [state, setState] = useState({
        generatedPassword: "",
        passwordLength: "10",
        symbols: false,
        numbers: false,
        lower: false,
        upper: false,
    });

    let updateInput = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    let updateCheck = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    let submit = (event) => {
        event.preventDefault();
        console.log("SS");
        let passwordObj = PasswordService.getPasswordObj(state);
        let thePassword = PasswordService.generatePassword(
            passwordObj,
            state.passwordLength
        );
        console.log(thePassword);
    };

    return (
        <div className="container">
            <pre>{JSON.stringify(state)}</pre>
            <form onSubmit={submit}>
                <input
                    value={state.generatedPassword}
                    onChange={updateInput}
                    // required={true}
                    type="text"
                    name="generatedPassword"
                    placeholder="password"
                />
                <input
                    value={state.passwordLength}
                    onChange={updateInput}
                    type="number"
                    name="passwordLength"
                    id=""
                    placeholder="Password Length"
                />

                <div>
                    <span>
                        Lower Case{" "}
                        <input
                            onChange={updateCheck}
                            type="checkbox"
                            name="lower"
                            id=""
                        />
                    </span>
                    <span>
                        Upper Case{" "}
                        <input
                            onChange={updateCheck}
                            type="checkbox"
                            name="upper"
                            id=""
                        />
                    </span>
                    <span>
                        Number{" "}
                        <input
                            onChange={updateCheck}
                            type="checkbox"
                            name="numbers"
                            id=""
                        />
                    </span>
                    <span>
                        Symbol{" "}
                        <input
                            onChange={updateCheck}
                            type="checkbox"
                            name="symbols"
                            id=""
                        />
                    </span>
                </div>

                <button type="submit">Generate</button>
            </form>
        </div>
    );
};

export default PasswordGenerator;
