import { useState } from "react";
import { CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";

import theme from "@components/theme";

import DisposeButton from "@components/Form/DisposeButton";
import SubmitButton from "@components/Form/SubmitButton";
import Input from "@components/Form/Input";

const CommandCell = ({ description, onComplete, args, dispose }) => {
    const [result, setResult] = useState();
    const [Icon, setIcon] = useState(CheckCircledIcon);

    const onSubmit = async (e) => {
        e.preventDefault();

        const argValues = [...e.target.querySelectorAll("input")].map(
            (i) => i.value
        );

        try {
            setResult(await onComplete(...argValues));
        } catch (e) {
            setIcon(CrossCircledIcon);
        }
    };

    return (
        <div
            css={{
                width: "100%",
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            <DisposeButton dispose={dispose} />
            <div
                css={{
                    width: "100%",
                    background: theme.inputBackground,
                    color: theme.white,
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    border: `1px solid ${theme.border}`,
                }}
            >
                <span>{description}</span>
                <form onSubmit={onSubmit} css={{ marginTop: "1rem" }}>
                    {result ? (
                        <>
                            <p
                                css={{
                                    margin: "1rem 0 0 0",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Icon css={{ marginRight: "0.5rem" }} />
                                {result}
                            </p>
                        </>
                    ) : (
                        <>
                            {args.map((arg, i) => (
                                <Input {...arg} key={i} />
                            ))}

                            <SubmitButton />
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CommandCell;
