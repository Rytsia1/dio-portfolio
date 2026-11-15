import { Container } from "@/components/ui/Container";

/** Skeleton of the archive: heading, controls, then cards shaped like `ProjectCard`. */
export default function Loading() {
  return (
    <Container className="flex flex-col gap-10 pb-24 pt-14">
      <div role="status" aria-label="Loading projects" className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-10 w-48 rounded-full" />
          <div className="skeleton h-5 w-full max-w-[30rem] rounded-full" />
        </div>
        <div className="skeleton h-11 w-full max-w-[21rem] rounded-full" />
        <ul aria-hidden className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <li
              key={index}
              className="flex flex-col rounded-card border border-border bg-surface p-3 card-shadow"
            >
              <div className="skeleton aspect-video rounded-sm" />
              <div className="flex flex-col gap-3 px-3 pb-3 pt-5">
                <div className="skeleton h-6 w-3/5 rounded-full" />
                <div className="skeleton h-3.5 w-full rounded-full" />
                <div className="skeleton h-3.5 w-4/5 rounded-full" />
                <div className="flex justify-between gap-4 pt-2">
                  <div className="skeleton h-3 w-2/5 rounded-full" />
                  <div className="skeleton h-3 w-11 rounded-full" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
