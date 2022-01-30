import Command from "@components/Command/Command";
import theme from "@components/theme";

const AutoCompleteResults = ({
    completeResults,
    setCommands,
    setQuery,
    cluiRef,
}) => {
    const onClick = (command) => {
        setCommands((c) => [...c, command]);

        cluiRef.current.querySelector("input").focus();
        setQuery("");
    };

    return completeResults.length ? (
        <div
            css={{
                background: theme.inputBackground,
                position: "absolute",
                top: "100%",
                left: "-1px",
                width: "calc(100% + 2px)",
                borderRadius: "0 0 0.75rem 0.75rem",
                userSelect: "none",
                overflow: "hidden",
                border: `1px solid ${theme.border}`,
                borderTop: "none"
            }}
        >
            {completeResults.map((r, i) => (
                <div
                    onClick={() => onClick(r)}
                    key={i}
                    css={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem",
                        width: "100%",
                        color: theme.commandDescription,
                        cursor: "pointer",
                        "&:hover": {
                            background: theme.commandDescriptionBackground,
                            color: theme.white,
                            ".command": {
                                backgroundColor: `${theme.commandHoverBackground} !important`,
                            },
                        },
                    }}
                >
                    <Command {...r} className="command" />
                    <span>{r.description}</span>
                </div>
            ))}
        </div>
    ) : (
        <></>
    );
};

export default AutoCompleteResults