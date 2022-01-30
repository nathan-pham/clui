import theme from "@components/theme";

const Input = ({ name, description, ...props }) => (
    <div
        css={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
        }}
    >
        <label
            css={{
                color: theme.border,
                marginBottom: "0.25rem",
            }}
            htmlFor={name}
        >
            {name}
        </label>
        <input
            placeholder={description || name}
            required
            {...props}
            css={{
                background: theme.commandBackground,
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: `1px solid ${theme.border}`,
                outline: "none",
                fontSize: "100%",
                width: "50%",
                color: theme.white,
                "&::placeholder": {
                    color: theme.inputPlaceholder,
                },
            }}
            name={name}
        />
    </div>
);

export default Input;
