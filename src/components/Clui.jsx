import { useEffect, useState } from "react";

import caretSrc from "./assets/caret.svg";
import theme from "./theme"

const availableCommands = [
    {
        name: "remove account",
        args: [],
    },
];


const Command = ({ name }) => {
    return (
        <div
            css={{
                background: theme.commandBackground,
                color: theme.white,
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                margin: "0 0.75rem 0 0",
                userSelect: "none",
            }}
        >
            {name}
        </div>
    );
};

const Clui = () => {
    const [commands, setCommands] = useState([]);
    const [placeholder, setPlaceholder] = useState("Enter a command");

    // useEffect(() => {
    //     setCommands((c) => [...c, { name: "Test" }]);
    // }, []);

    return (
        <div
            css={{
                display: "flex",
                background: theme.inputBackground,
                alignItems: "center",
                margin: "3rem auto",
                maxWidth: "50rem",
                padding: "0.75rem",
                borderRadius: "0.75rem",
            }}
        >
            {commands.length ? (
                commands.map((c, i) => <Command {...c} key={i} />)
            ) : (
                <img
                    src={caretSrc}
                    css={{
                        height: "1rem",
                        width: "1rem",
                        margin: "0.5rem 0.75rem 0.5rem 0",
                    }}
                />
            )}
            <input
                placeholder={placeholder}
                css={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "100%",
                    width: "100%",
                    color: theme.white,
                    padding: 0,
                    "&::placeholder": {
                        color: theme.inputPlaceholder,
                    },
                    "&:hover, &:focus": {
                        "&::placeholder": {
                            color: theme.inputHoverPlaceholder
                        }
                    }
                }}
            />
        </div>
    );
};

export default Clui;
