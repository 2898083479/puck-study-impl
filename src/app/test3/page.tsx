"use client";

import { Puck } from "@measured/puck";
import type { Config } from "@measured/puck";
import "@measured/puck/puck.css";

type Component = {
    HeadingBlock: {
        title: string;
    },
    MyComponent: {
        drink: string;
    }
}

const config: Config<Component> = {
    components: {
        HeadingBlock: {
            fields: {
                title: {
                    type: "text",
                    label: "Text",
                }
            },
            render: ({ title }) => {
                return (
                    <div>
                        <h1>{title}</h1>
                    </div>
                )
            }
        },
        MyComponent: {
            resolveFields: (data) => {
                const fields = {
                    drink: {
                        type: "radio" as const,
                        options: [
                            {
                                label: "Coffee",
                                value: "coffee"
                            },
                            {
                                label: "Tea",
                                value: "tea"
                            }
                        ]
                    }
                }
                if (data.props.drink === "tea") {
                    return {
                        ...fields,
                        teaType: {
                            type: "radio" as const,
                            options: [
                                {
                                    label: "Black",
                                    value: "black"
                                },
                                {
                                    label: "Green",
                                    value: "green"
                                }
                            ]
                        }
                    }
                }
                if (data.props.drink === "coffee") {
                    return {
                        ...fields,
                        coffeeType: {
                            type: "radio" as const,
                            options: [
                                {
                                    label: "Arabica",
                                    value: "arabica"
                                },
                                {
                                    label: "Robusta",
                                    value: "robusta"
                                }
                            ]
                        }
                    }
                }
                return fields;
            },
            render: (data) => {
                return <div>My Component</div>
            }
        }
    }
}

export default function TestPage3() {
    return (
        <Puck config={config} data={{}} />
    )
}