import Clui from "./components/Clui";
import theme from "./components/theme";

import settingsSrc from "./components/assets/settings.svg";

const availableCommands = [
    {
        icon: settingsSrc,
        name: "account",
        description: "Manage your account",
        commands: [
            {
                icon: settingsSrc,
                name: "delete",
                description: "Delete your account"
            }
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
