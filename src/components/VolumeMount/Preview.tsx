import { useContext } from "react";
import { VolumeMountContext } from "../../lib/context";
import { SystemdMount } from "../../lib/volume";

export const Preview = () => {
  const context = useContext(VolumeMountContext);
  if (!context) return <h1>Text</h1>;

  const mount = new SystemdMount(
    context.data.name,
    context.data.description,
    context.data.what,
    context.data.where,
    context.data.type,
    context.data.options,
  );

  const filename = context.data.where.substring(1).split('/').join('-') + '.mount';

  return (
    <div className="flex max-w-full flex-col gap-6 p-6">
      <p>
        Place this file on the system at the path above it, and run{" "}
        <span className="rounded bg-gray-200 p-1 font-mono">
          systemctl daemon-reload
        </span>{" "}
        to make sure they are loaded by systemd.
      </p>
      <div>
        <div className="flex h-10 items-center bg-gray-300 px-4">
          /etc/systemd/system/{filename}
        </div>
        <pre className="flex w-full flex-col gap-1 bg-gray-100 p-4 text-sm">
          {mount
            .toString()
            .split("\n")
            .map((v, i) => (
              <p key={i} className="h-5">
                {v}
              </p>
            ))}
        </pre>
      </div>
    </div>
  );
};
