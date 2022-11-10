import { Context, useContext } from "react";
import type { ContextSkeleton } from "../lib/context";
import { TextField } from "./TextField";

export const UnitSettings: React.FC<{ context: ContextSkeleton<unknown> }> = ({ context }) => (
    <div className="flex w-full flex-col gap-6">
        <TextField
            name="name"
            label="Name"
            onChange={(ev) => {
                context.update({ name: ev.target.value });
            } }
            value={context.data.name} />

        <TextField
            name="description"
            label="Description"
            onChange={(ev) => {
                context.update({ description: ev.target.value });
            } }
            value={context.data.description} />
    </div>
)