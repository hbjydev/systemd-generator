import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { data } = req.query;
  if (!data) {
    throw new Error('invalid data query');
  }

  const buf = Buffer.from(data as string, 'base64');
  const json = buf.toString('ascii');
  const config = JSON.parse(json);

  const unit = `[Unit]
Description=${config.description}
Requires=${config.name}

[Timer]
Unit=${config.name}.service
OnCalendar=${config.calendar}

[Install]
WantedBy=timers.target
`

  return res.end(unit);
}

export default handler;
