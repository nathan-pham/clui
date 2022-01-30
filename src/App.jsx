import { GearIcon, TrashIcon } from "@radix-ui/react-icons";

import Clui from "@components/Clui";
import theme from "@components/theme";

const availableCommands = [
    {
        icon: GearIcon,
        name: "account",
        description: "Manage your account",
        commands: [
            {
                icon: TrashIcon,
                name: "delete",
                description: "Delete your account",

                args: [
                    { name: "ok", description: "Type an ok!", type: "text" }
                ],
                // fetchContent: () => ``,
                onComplete: (ok) => {
                    console.log("completed command", ok)
                    return "Finished!"
                },
            },
        ],
    },
    {
        icon: TrashIcon,
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
