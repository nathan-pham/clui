import { useEffect, useState } from "react";
import { CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";

import theme from "@components/theme";

import DisposeButton from "@components/Form/DisposeButton";
import SubmitButton from "@components/Form/SubmitButton";
import Input from "@components/Form/Input";

const CommandCell = ({
    description,
    onComplete,
    args = [],
    dispose = () => {},
    setCommandCells = () => {},
}) => {
    const [result, setResult] = useState();
    const [visible, setVisible] = useState(false);
    const [Icon, setIcon] = useState(CheckCircledIcon);

    const onSubmit = async (e) => {
        e.preventDefault();

        const argValues = [setCommandCells].concat(
            [...e.target.querySelectorAll("input")].map((i) => i.value) || []
        );

        try {
            setResult(await onComplete(...argValues));
        } catch (e) {
            setResult(e.message);
            setIcon(CrossCircledIcon);
        }
    };

    useEffect(async () => {
        if (!args.length) {
            const _result = await onComplete(setCommandCells);

            if (_result) {
                setVisible(true);
                setResult(_result);
            } else {
                dispose();
            }
        } else {
            setVisible(true);
        }
    }, []);

    return visible ? (
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
                                    wordBreak: "break-all",
                                }}
                            >
                                <Icon
                                    css={{
                                        marginRight: "0.5rem",
                                    }}
                                />
                                <span
                                    dangerouslySetInnerHTML={{ __html: result }}
                                ></span>
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
    ) : (
        <></>
    );
};

export default CommandCell;
