import { DISCORD_URL } from "@config/constants";
import Link from "next/link";

function JoinUs(): JSX.Element {
  return (
    <section className="mt-24">
      <h2>Help us build the website !</h2>

      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-between pr-12">
          <p className="mb-4">
            We are building this website in the open. <br />
            Feel free to join us on Discord and start contributing if you feel
            like it !<br />
            It might be to fix a typo, designing things, developing or writing
            content for the website !
          </p>
          <div className="flex justify-around gap-4">
            <a className="btn" href={DISCORD_URL}>
              Join us on Discord !
            </a>
            <Link href="/submit-missing-data" passHref={true}>
              <a className="btn">Contribute your data</a>
            </Link>
          </div>
        </div>
        <img src="/launched.jpg" alt="" />
      </div>
    </section>
  );
}

export default JoinUs;
