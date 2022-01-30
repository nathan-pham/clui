import theme from "@components/theme";

const Command = ({ name, icon: Icon, className }) => {
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
            {Icon ? <Icon css={{ marginRight: "0.5rem", color: theme.white }} /> : <></>}
            {name}
        </div>
    );
};

export default Command;
