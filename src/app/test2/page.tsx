"use client";

import { Puck } from "@measured/puck";
import type { Config } from "@measured/puck";
import { DropZone } from "@measured/puck";
import "@measured/puck/puck.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Component = {
    HeadingBlock: {
        title: string;
        resolvedTitle: string;
    };
    Example: {};
    Card: {
        text: string;
    };
};

const config: Config<Component> = {
    components: {
        HeadingBlock: {
            fields: {
                title: {
                    type: "text",
                    label: "Text",
                },
                resolvedTitle: {
                    type: "text",
                    label: "Resolved Title",
                }
            },
            resolveData: async ({props}, {changed}) => {
                if (!changed.title) {
                    console.log("has change")
                    return {
                        props
                    }
                }
                return {
                    props: {
                        // title: props.title,
                        resolvedTitle: props.title,
                    },
                    readOnly: {
                        resolvedTitle: true,
                    }
                }
            },
            render: ({ title, resolvedTitle }) => {
                console.log("title has changed:", title)
                return (
                    <div className="bg-red-500 p-4 rounded-lg m-6">
                        <h1 className="text-2xl font-bold">{resolvedTitle}</h1>
                    </div>
                )
            }
        },
        Example: {
            render: () => {
                return (
                    <div className="m-6 grid grid-cols-2 gap-4">
                        <DropZone zone="left-content" className="flex flex-row gap-4"></DropZone>
                        <DropZone zone="right-content"></DropZone>
                    </div>
                );
            },
        },
        Card: {
            // inline: true,
            defaultProps: {
                text: "Hello, world",
            },
            render: ({ text }) => {
                return <div className="bg-blue-500 p-4 rounded-lg">{text}</div>
            }
        }
    },
};

export default function TestPage2() {
    return <Puck config={config} data={{}} />;
}
