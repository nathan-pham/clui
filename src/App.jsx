import { GearIcon, TrashIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import Clui from "@components/Clui";
import theme from "@components/theme";

const availableCommands = [
    {
        icon: EyeOpenIcon,
        name: "banner",
        description: "Generate a project banner",

        args: [
            { name: "title", description: "Enter a project title" },
            { name: "description", description: "Enter a project description" },
            { name: "stack", description: "Enter a project tech stack" }
        ],
        onComplete: (title, description, stack) => {
            const host = new URL( "https://project-banner.phamn23.repl.co")

            host.searchParams.append("title", title)
            host.searchParams.append("description", description)
            host.searchParams.append("stack", stack)
            return `<a href="${host.toString()}" target="__blank">project banner</a>`

        }
    }
    // {
    //     icon: GearIcon,
    //     name: "account",
    //     description: "Manage your account",
    //     commands: [
    //         {
    //             icon: TrashIcon,
    //             name: "delete",
    //             description: "Delete your account",

    //             args: [
    //                 { name: "ok", description: "Type an ok!", type: "text" }
    //             ],
    //             onComplete: (ok) => {
    //                 console.log("completed command", ok)
    //                 return "Finished!"
    //             },
    //         },
    //     ],
    // },
    // {
    //     icon: TrashIcon,
    //     name: "trash",
    //     description: "List and store deleted repls",
    // },
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
