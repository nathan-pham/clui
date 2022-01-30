import {
    GearIcon,
    TrashIcon,
    EyeOpenIcon,
    ArrowTopRightIcon,
} from "@radix-ui/react-icons";

import Clui from "@components/Clui";
import theme from "@components/theme";

const availableCommands = [
    {
        icon: ArrowTopRightIcon,
        name: "bookmarks",
        description: "Open a saved collection of bookmarks",

        commands: [
            {
                icon: ArrowTopRightIcon,
                name: "github",
                description: "Nathan Pham's Github",

                onComplete: () => {
                    window.open("https://github.com/nathan-pham");
                },
            },
            {
                icon: ArrowTopRightIcon,
                name: "twitter",
                description: "Nathan Pham's Twitter",

                onComplete: () => {
                    window.open("https://twitter.com/phamn23");
                },
            },
            {
                icon: ArrowTopRightIcon,
                name: "website",
                description: "Nathan Pham's Personal Website",

                onComplete: () => {
                    window.open("https://nathanpham.me");
                },
            },
        ],
    },
    {
        icon: EyeOpenIcon,
        name: "banner",
        description: "Generate a project banner",

        args: [
            { name: "title", description: "Enter a project title" },
            { name: "description", description: "Enter a project description" },
            { name: "stack", description: "Enter a project tech stack" },
        ],
        onComplete: (_, title, description, stack) => {
            const host = new URL("https://project-banner.phamn23.repl.co");

            host.searchParams.append("title", title);
            host.searchParams.append("description", description);
            host.searchParams.append("stack", stack);
            return `<a href="${host.toString()}" target="__blank">project banner</a>`;
        },
    },
    {
        icon: TrashIcon,
        name: "clear",
        description: "Delete all command cells",

        onComplete: (setCommandCells) => {
            setCommandCells([]);
        },
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
