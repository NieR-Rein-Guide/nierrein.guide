import { DISCORD_URL } from "@config/constants";
import Image from "next/image";
import Link from "next/link";

function JoinUs(): JSX.Element {
  return (
    <section>
      <h2 className="overlap">Help us build the website !</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between md:pr-12">
          <p className="mb-4 leading-loose">
            We are building this website in the open. <br />
            Feel free to join us on Discord and start contributing if you feel
            like it !<br />
            It might be to fix a typo, designing things, developing or writing
            content for the website !
          </p>
          <div className="flex flex-col md:flex-row justify-around gap-4">
            <a className="btn h-14" href={DISCORD_URL}>
              Join us on Discord !
            </a>
            <Link href="/submit-missing-data" passHref={true}>
              <a className="btn h-14">Contribute your data</a>
            </Link>
          </div>
        </div>
        <div className="relative h-56 mt-8 lg:mt-0 select-none">
          <Image
            layout="fill"
            objectFit="contain"
            src="/launched.jpg"
            alt="Promotional image"
          />
        </div>
      </div>
    </section>
  );
}

export default JoinUs;
