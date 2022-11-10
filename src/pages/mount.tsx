import { type NextPage } from "next";
import Head from "next/head";
import { Shell } from "../components/Shell";
import { Form } from "../components/VolumeMount/Form";
import { Preview } from "../components/VolumeMount/Preview";
import type { VolumeMountFormData } from "../lib/context";
import { VolumeMountContext } from "../lib/context";
import { useContextSetup } from "../lib/contextHook";

const Home: NextPage = () => {
  const data = useContextSetup<VolumeMountFormData>({
    name: '',
    description: 'Additional drive mount for /mnt/driveone',
    what: '/dev/disk/by-uuid/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    where: '/mnt/driveone',
    type: 'ext4',
    options: 'defaults',
  });

  return (
    <>
      <Head>
        <title>systemd unit generator</title>
      </Head>

      <Shell>
        <VolumeMountContext.Provider value={data}>
          <div className="grid grid-cols-2">
            <Form />
            <Preview />
          </div>
        </VolumeMountContext.Provider>
      </Shell>
    </>
  );
};

export default Home;
