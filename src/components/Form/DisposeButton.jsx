import { Cross2Icon } from "@radix-ui/react-icons";
import theme from "@components/theme";

const DisposeButton = ({ dispose }) => (
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
                background: theme.buttonHoverBackground,
            },
        }}
    >
        <Cross2Icon
            css={{
                color: theme.white,
            }}
        />
    </button>
);

export default DisposeButton;
