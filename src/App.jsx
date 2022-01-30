import { GearIcon } from "@radix-ui/react-icons";

import Clui from "@components/Clui";
import theme from "@components/theme";

const availableCommands = [
    {
        icon: GearIcon,
        name: "account",
        description: "Manage your account",
        commands: [
            {
                icon: GearIcon,
                name: "delete",
                description: "Delete your account",

                args: ["ok"],
                fetchContent: () => ``,
                onComplete: (_, ok) => console.log("completed command", ok),
            },
        ],
    },
    {
        name: "trash",
        description: "List and store deleted repls",
    },
];

const App = () => (
    <div
        css={{
            background: theme.bodyBackground,
            overflowX: "hidden",
            minHeight: "100vh",
        }}
    >
        <Clui availableCommands={availableCommands} />
    </div>
);

export default App;
