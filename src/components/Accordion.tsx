import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import SVG from "react-inlinesvg";

interface AccordionProps {
  items: {
    title: string;
    content: string | JSX.Element;
  }[];
}

export default function MyAccordion({ items }: AccordionProps): JSX.Element {
  return (
    <Accordion>
      {items.map((item) => (
        <AccordionItem key={item.title} className="bg-beige-darker mb-4">
          <h3>
            <AccordionButton
              className="font-labor text-xl
                flex items-center justify-start
              bg-beige-darker relative bordered p-8 text-left w-full"
            >
              <SVG src="/decorations/bullet-list.svg" height="20" width="30" />
              <span className="ml-2">{item.title}</span>
            </AccordionButton>
          </h3>
          <AccordionPanel className="p-8">{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
