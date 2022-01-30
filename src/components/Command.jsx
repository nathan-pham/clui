import theme from "./theme";

const Command = ({ name, icon, className }) => {
    return (
        <div
            className={className}
            css={{
                background: theme.commandBackground,
                color: theme.white,
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                marginRight: "0.75rem",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                width: "fit-content"
            }}
        >
            {icon ? <img src={icon} css={{ marginRight: "0.5rem" }} /> : <></>}
            {name}
        </div>
    );
};

export default Command;
