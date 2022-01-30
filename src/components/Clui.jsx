import { useEffect, useState, useRef } from "react";
import AutoCompleteResults from "./AutoCompleteResults";
import Command from "./Command";

import caretSrc from "./assets/caret.svg";
import theme from "./theme";

const Clui = ({ availableCommands }) => {
    const [commands, setCommands] = useState([]);
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter a command");
    const [completeResults, setCompleteResults] = useState([]);
    const [focus, setFocus] = useState(false);
    const clui = useRef(null);

    const onKeyDown = (e) => {
        const key = e.key.toLowerCase();

        switch (key) {
            case "backspace":
                if (
                    document.getSelection().toString().trim().length == 0 &&
                    query.length == 0
                ) {
                    setCommands((c) => c.slice(0, -1));
                }
                break;
        }
    };

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const onClick = (e) => {
            setFocus(e.composedPath().includes(clui.current));
        };

        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
        };
    }, []);

    useEffect(() => {
        if (focus) {
            // console.log(commands[commands.length - 1].commands)
            // console.log(commands.length ? (commands.slice(-1).commands || []) : availableCommands)
            setCompleteResults(
                (commands.length
                    ? commands[commands.length - 1]?.commands || []
                    : availableCommands
                ).filter((c) => c.name.includes(query.toLowerCase()))
            );
        } else {
            setCompleteResults([]);
        }
    }, [commands, query, focus]);

    return (
        <div
            ref={clui}
            css={{
                display: "flex",
                background: theme.inputBackground,
                alignItems: "center",
                margin: "3rem auto",
                maxWidth: "50rem",
                padding: "0.75rem",
                outline: "none",
                borderRadius: completeResults.length
                    ? "0.75rem 0.75rem 0 0"
                    : "0.75rem",
                position: "relative",
            }}
        >
            {commands.length ? (
                commands.map((c, i) => <Command {...c} key={i} />)
            ) : (
                <div
                    css={{
                        height: "2.344rem",
                        marginRight: "0.75rem",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <img
                        src={caretSrc}
                        css={{
                            height: "1rem",
                            width: "1rem",
                        }}
                    />
                </div>
            )}
            <input
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={query}
                css={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "100%",
                    width: "100%",
                    height: "100%",
                    color: theme.white,
                    padding: 0,
                    "&::placeholder": {
                        color: theme.inputPlaceholder,
                    },
                    "&:hover, &:focus": {
                        "&::placeholder": {
                            color: theme.inputHoverPlaceholder,
                        },
                    },
                }}
            />

            <AutoCompleteResults
                completeResults={completeResults}
                setCommands={setCommands}
                setQuery={setQuery}
                cluiRef={clui}
            />
        </div>
    );
};

export default Clui;