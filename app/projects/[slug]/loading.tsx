import { Container } from "@/components/ui/Container";

/** Skeleton of a case study: back link, title, lead, meta row, cover. */
export default function Loading() {
  return (
    <Container className="pb-24 pt-8">
      <div role="status" aria-label="Loading case study" className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="skeleton h-5 w-28 rounded-full" />
          <div className="skeleton h-14 w-full max-w-[26rem] rounded-full" />
          <div className="skeleton h-5 w-full max-w-[34rem] rounded-full" />
          <div className="skeleton h-5 w-full max-w-[28rem] rounded-full" />
        </div>
        <div className="flex flex-wrap gap-x-16 gap-y-4">
          <div className="skeleton h-10 w-32 rounded-sm" />
          <div className="skeleton h-10 w-20 rounded-sm" />
          <div className="skeleton h-10 w-64 rounded-sm" />
        </div>
        <div className="skeleton aspect-video rounded-card md:aspect-[21/9]" />
      </div>
    </Container>
  );
}
