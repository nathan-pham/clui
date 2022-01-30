import theme from "@components/theme";

const SubmitButton = () => (
    <button
        css={{
            outline: "none",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "100%",
            cursor: "pointer",
            marginTop: "1rem",
            background: theme.buttonPrimaryBackground,
            color: theme.white,
            border: `1px solid ${theme.buttonPrimaryBackground}`,
            "&:hover": {
                border: `1px solid ${theme.buttonPrimaryBorder}`,
            },
        }}
    >
        Submit
    </button>
);

export default SubmitButton;
