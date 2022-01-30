import { useEffect, useState, useRef } from "react";
import AutoCompleteResults from "@components/AutoCompleteResults";
import Command from "@components/Command/Command";

import theme from "@components/theme";
import { ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";

const CommandCell = ({ name, description, args, dispose }) => {
    const onSubmit = () => {};

    return (
        <div
            css={{
                width: "100%",
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            <button
                onClick={dispose}
                css={{
                    background: theme.inputBackground,
                    borderRadius: "0.75rem",
                    border: `1px solid ${theme.border}`,
                    display: "grid",
                    placeItems: "center",
                    outline: "none",
                    height: "2.5rem",
                    width: "2.5rem",
                    cursor: "pointer",
                    marginBottom: "1rem",
                    "&:hover": {
                        background: theme.buttonHover,
                    },
                }}
            >
                <Cross2Icon
                    css={{
                        color: theme.white,
                    }}
                />
            </button>
            <div
                css={{
                    width: "100%",
                    background: theme.inputBackground,
                    color: theme.white,
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    border: `1px solid ${theme.border}`,
                }}
            >
                <span>{description}</span>
                <form onSubmit={onSubmit} css={{marginTop: "2rem"}}>
                    {args.map((a) => (
                        <div css={{
                            marginTop: "1rem"
                        }}>
                            <input
                                placeholder={a}
                                css={{
                                    background: theme.commandBackground,
                                    padding: "1rem",
                                    borderRadius: "0.75rem",
                                    border: `1px solid ${theme.border}`,
                                    fontSize: "100%",
                                    minWidth: "50%",
                                    "&::placeholder": {
                                        color: theme.inputPlaceholder,
                                    },
                                    
                                }}
                            />
                            <br />
                            <label>{a}</label>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

const Clui = ({ availableCommands }) => {
    const [commands, setCommands] = useState([]);
    const [commandCells, setCommandCells] = useState([]);

    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter a command");
    const [completeResults, setCompleteResults] = useState([]);
    const [focus, _setFocus] = useState(false);
    const cluiRef = useRef(null);

    const setFocus = (f) => {
        _setFocus(f);
        if (f) {
            cluiRef.current.querySelector("input").focus();
        } else {
            document.activeElement.blur();
        }
    };

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
                    borderBottom: completeResults.length ? "none" : "",
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

            {commandCells.map((cell, i) => {
                const dispose = () => {
                    setCommandCells((_commandCells) =>
                        _commandCells.filter((_, j) => j !== i)
                    );
                };

                return <CommandCell {...cell} key={i} dispose={dispose} />;
            })}

            <footer css={{ height: "3rem", width: "100%" }}></footer>
        </div>
    );
};

export default Clui;
