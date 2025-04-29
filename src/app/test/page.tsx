"use client";

import { Puck } from "@measured/puck";
import type { Config } from "@measured/puck";
import "@measured/puck/puck.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Component = {
    HeadingBlock: {
        title: string;
    };
    ButtonBlock: {};
};

type RootProps = {
    title: string;
    description: string;
    children: React.ReactNode;
}

const config: Config<Component, RootProps> = {
    components: {
        HeadingBlock: {
            fields: {
                title: {
                    type: "text",
                    label: "Title",
                },
            },
            defaultProps: {
                title: "Hello, world",
            },
            render: ({ title }) => {
                return <Input value={title} />;
            },
        },
        ButtonBlock: {
            render: () => {
                return (
                    <div className="flex justify-center items-center">
                        <Button className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/90">Click me</Button>
                    </div>
                );
            },
        },
    },
    root: {
        fields: {
            title: {
                type: "text",
                label: "Title",
            },
            description: {
                type: "textarea",
                label: "Description",
            },
        },
        defaultProps: {
            title: "Hello, world",
            description: "This is a description",
        },
        render: ({ children, title, description }: RootProps) => {
            return (
                <div className="flex flex-col gap-4 p-4 rounded-lg">
                    <h1>{title}</h1>
                    <Textarea className="resize-none" value={description} />
                    {children}
                </div>
            );
        },
    },
};

export default function TestPage() {
    return <Puck config={config} data={{}} />;
}
