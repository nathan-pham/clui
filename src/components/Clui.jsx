import { useEffect, useState, useRef } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import theme from "@components/theme";

import AutoCompleteResults from "@components/AutoCompleteResults";
import CommandCell from "@components/Command/CommandCell";
import Command from "@components/Command/Command";

const Clui = ({ availableCommands }) => {
    const [commands, setCommands] = useState([]);
    const [commandCells, setCommandCells] = useState([]);

    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter a command");
    const [completeResults, setCompleteResults] = useState([]);
    const [focus, setFocus] = useState(false);
    const cluiRef = useRef(null);

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

            case "enter":
                const command = commands.slice(-1)[0];

                if (command?.args) {
                    setCommandCells((c) => [...c, command]);
                    setCommands([]);
                    setFocus(false);
                    document.activeElement.blur();
                }

                break;
        }
    };

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const onClick = (e) => {
            const focused = e.composedPath().includes(cluiRef.current);
            setFocus(focused);
            if (focused) {
                cluiRef.current.querySelector("input").focus();
            }
        };

        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
        };
    }, []);

    useEffect(() => {
        if (focus) {
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
            css={{
                margin: "3rem auto 0 auto",
                maxWidth: "50rem",
            }}
        >
            <div
                ref={cluiRef}
                css={{
                    display: "flex",
                    background: theme.inputBackground,
                    alignItems: "center",
                    width: "100%",
                    padding: "0.75rem",
                    outline: "none",
                    borderRadius: completeResults.length
                        ? "0.75rem 0.75rem 0 0"
                        : "0.75rem",
                    border: `1px solid ${theme.border}`,
                    borderBottom: completeResults.length
                        ? `1px solid ${theme.inputBackground}`
                        : "",
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
                        <ChevronRightIcon
                            css={{
                                height: "1rem",
                                width: "1rem",
                                color: theme.white,
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
                    cluiRef={cluiRef}
                />
            </div>

            <div css={{ display: "flex", flexDirection: "column-reverse" }}>
                {commandCells.map((cell, i) => {
                    const dispose = () => {
                        setCommandCells((_commandCells) =>
                            _commandCells.filter((_, j) => j !== i)
                        );
                    };

                    return <CommandCell {...cell} key={i} dispose={dispose} />;
                })}
            </div>

            <footer css={{ height: "3rem", width: "100%" }}></footer>
        </div>
    );
};

export default Clui;
