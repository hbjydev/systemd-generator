import { useContext } from "react";
import { VolumeMountContext } from "../../lib/context";
import { TextField } from "../TextField";
import { UnitSettings } from "../UnitSettings";

export const Form = () => {
  const context = useContext(VolumeMountContext);
  if (!context) return <h1>Text</h1>;

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <UnitSettings context={context} />

      <hr />

      <div className="flex w-full flex-col gap-6">
        <TextField
          name="what"
          label="Physical Disk"
          onChange={(ev) => {
            context.update({ what: ev.target.value });
          }}
          value={context.data.what}
        />

        <TextField
          name="where"
          label="Mount Location"
          onChange={(ev) => {
            context.update({ where: ev.target.value });
          }}
          value={context.data.where}
        />

        <TextField
          name="type"
          label="Filesystem Type"
          onChange={(ev) => {
            context.update({ type: ev.target.value });
          }}
          value={context.data.type}
        />

        <TextField
          name="options"
          label="Mount options"
          onChange={(ev) => {
            context.update({ options: ev.target.value });
          }}
          value={context.data.options}
        />
      </div>
    </div>
  );
};
