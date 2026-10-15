import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface BoardProps {
  children: ReactNode;
  header?: ReactNode;
  id?: string;
  className?: string;
  // Gutters between columns can vary as specified: wide, tight, open
  gutter?: "tight" | "normal" | "wide";
}

export function Board({ children, header, id, className = "", gutter = "normal" }: BoardProps) {
  const gutterClass = {
    tight: "gap-5 lg:gap-6",
    normal: "gap-6 lg:gap-8",
    wide: "gap-8 lg:gap-12",
  }[gutter];

  return (
    <section id={id} className={`w-full py-10 md:py-14 lg:py-16 ${className}`}>
      <Container>
        {header && <div className="mb-6 md:mb-8">{header}</div>}
        {/* Mobile + tablet: columns stack. Desktop (lg+): side by side as a row. */}
        <div className={`flex flex-col lg:flex-row ${gutterClass} items-stretch`}>
          {children}
        </div>
      </Container>
    </section>
  );
}
