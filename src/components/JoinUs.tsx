import { DISCORD_URL } from "@config/constants";
import Image from "next/image";

function JoinUs(): JSX.Element {
  return (
    <section className="relative bg-grey-dark border-opacity-50 p-8 md:max-w-5xl md:mx-auto">
      <div className="flex flex-col items-center md:pr-12">
        <p className="mb-4 leading-loose text-center">
          We are building this website in the open
          <br />
          Feel free to join us on Discord and start contributing if you feel
          like it!
          <br />
          It might be to fix a typo, designing things, developing or writing
          content for the website!
        </p>
        <div className="flex flex-col md:flex-row justify-around gap-4">
          <a className="btn h-14" href={DISCORD_URL}>
            Join us on Discord
          </a>
        </div>
      </div>
      <Image
        className="opacity-10 filter blur-sm"
        layout="fill"
        objectFit="cover"
        src="/launched.jpg"
        alt=""
      />
    </section>
  );
}

export default JoinUs;
