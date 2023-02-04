import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import SVG from "react-inlinesvg";

interface AccordionProps {
  items: {
    title: string;
    content: string | JSX.Element;
  }[];
}

export default function MyAccordion({ items }: AccordionProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      {items.map((item) => (
        <Collapsible.Root
          key={item.title}
          className="CollapsibleRoot"
          open={open}
          onOpenChange={setOpen}
        >
          <Collapsible.Trigger asChild>
            <h3
              className="font-labor text-xl
                flex items-center justify-start
              bg-beige-darker relative bordered p-8 text-left w-full"
            >
              <SVG src="/decorations/bullet-list.svg" height="20" width="30" />
              <span className="ml-2">{item.title}</span>
            </h3>
          </Collapsible.Trigger>
          <Collapsible.Content className="p-8">
            {item.content}
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </>
  );
}
