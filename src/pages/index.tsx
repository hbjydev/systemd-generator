import { type NextPage } from "next";
import Head from "next/head";
import type { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { useState } from "react";

type HandleUpdateFunc<T> = (fn: Dispatch<SetStateAction<T>>) => ChangeEventHandler<HTMLInputElement>

const Home: NextPage = () => {
  const [name, setName] = useState('grafana-agent');
  const [program, setProgram] = useState('/usr/local/bin/grafana-agent');
  const [description, setDescription] = useState('Run Grafana Agent');
  const [isTimer, setIsTimer] = useState(false);
  const [calendar, setCalendar] = useState('*-*-* *:*:00');

  const handleUpdate: HandleUpdateFunc<string> = (fn) => (ev) => {
    fn(ev.target.value);
  };

  const handleCheckUpdate: HandleUpdateFunc<boolean> = (fn) => (ev) => {
    fn(ev.target.checked);
  };

  const unit = `[Unit]
Description=${description}${isTimer ? `\nWants=${name}.timer` : ''}

[Service]
Type=${isTimer ? 'oneshot' : 'simple'}
ExecStart=${program}

[Install]
WantedBy=multi-user.target`;

  const timer = `[Unit]
Description=${description}
Requires=${name}.service

[Timer]
Unit=${name}.service
OnCalendar=${calendar}

[Install]
WantedBy=timers.target`;

  return (
    <>
      <Head>
        <title>Systemd unit generator</title>
      </Head>

      <main className="container mx-auto bg-gray-50">
        <h1 className="font-bold text-3xl text-center py-6">Simple Service Generator</h1>
        <div className="flex">
          <div className="w-full p-6 flex flex-col gap-6">
            <div className="w-full flex flex-col gap-6">
              <fieldset className="flex flex-col gap-3">
                <label htmlFor="program">Name</label>
                <input
                  id="name"
                  className="bg-white border px-2 py-1 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="program"
                  onChange={handleUpdate(setName)}
                  value={name}
                />
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <label htmlFor="program">Program to run</label>
                <input
                  id="program"
                  className="bg-white border px-2 py-1 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="/usr/local/bin/program -s 1"
                  onChange={handleUpdate(setProgram)}
                  value={program}
                />
                <p className="text-sm text-gray-500">This must be the path to a program or script you want to run.</p>
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  className="bg-white border px-2 py-1 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Runs the program with a 1 second second."
                  onChange={handleUpdate(setDescription)}
                  value={description}
                />
              </fieldset>
            </div>

            <hr />

            <div className="w-full flex flex-col gap-6">
              <h4 className="font-bold text-lg">Timers</h4>

              <fieldset className="flex gap-2 select-none">
                <input
                  id="isTimer"
                  onChange={handleCheckUpdate(setIsTimer)}
                  checked={isTimer}
                  type="checkbox"
                  className="border-gray-300 bg-gray-100 rounded-none"
                />
                <label htmlFor="isTimer">Is timer?</label>
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <label htmlFor="calendar">Schedule</label>
                <input
                  id="calendar"
                  className="bg-white border px-2 py-1 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="*-*-* *:*:00"
                  onChange={handleUpdate(setCalendar)}
                  value={calendar}
                />
                <p className="text-sm text-gray-500">See <a className="font-bold text-blue-500 underline" href="https://www.freedesktop.org/software/systemd/man/systemd.time.html#Calendar%20Events">freedesktop.org</a> for syntax help.</p>
              </fieldset>
            </div>
          </div>

          <div className="w-full p-6 flex flex-col gap-6">
            <p>Place these files on the system at the paths above them, and run <span className="font-mono bg-gray-200 p-1 rounded">systemctl daemon-reload</span> to make sure they are loaded by systemd.</p>
            <div>
              <div className="bg-gray-300 h-10 flex items-center px-4">/etc/systemd/system/{name}.service</div>
              <pre className="bg-gray-100 w-full p-4 flex flex-col gap-1 text-sm">
                {unit.split('\n').map((v, i) => (
                  <p key={i} className="h-5">{v}</p>
                ))}
              </pre>
            </div>
            { isTimer ?
              <div>
                <div className="bg-gray-300 h-10 flex items-center px-4">/etc/systemd/system/{name}.timer</div>
                <pre className="bg-gray-100 w-full p-4 flex flex-col gap-1 text-sm">
                  {timer.split('\n').map((v, i) => (
                    <p key={i} className="h-5">{v}</p>
                  ))}
                </pre>
              </div> :
              null
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

