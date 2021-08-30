import { SOCIALS } from "@config/constants";
import BtnSecondary from "@components/btn/secondary";

function Socials(): JSX.Element {
  return (
    <section className="w-full p-8">
      <h2 className="overlap left-1/2 -translate-x-1/2">Links</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-6 mt-6">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <BtnSecondary
              href={social.href}
              rel="noopener noreferrer"
              target="_blank"
              className="justify-center h-full"
            >
              <div className="flex flex-col justify-between max-h-16">
                {social.icon}
                <span>{social.label}</span>
              </div>
            </BtnSecondary>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Socials;
