import { CURRENT_PROJECTS } from "@config/constants";
import classNames from "classnames";

export default function CurrentlyWorkingOn(): JSX.Element {
  return (
    <section>
      <h2 className="overlap">Currently in the works</h2>

      <div className="flex flex-col md:flex-row gap-x-8 mb-8">
        <p className="flex items-center gap-x-2">
          <CircleState progress={100} />
          <span>Done, waiting for implementation</span>
        </p>
        <p className="flex items-center gap-x-2">
          <CircleState progress={50} />
          <span>In progress</span>
        </p>
        <p className="flex items-center gap-x-2">
          <CircleState progress={0} />
          <span>Not started</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CURRENT_PROJECTS.map((project) => (
          <a
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
            key={project.name}
            className="flex flex-col justify-center items-center border border-beige-dark px-4 py-8 transition-transform transform hover:-translate-y-1 rounded-md"
            style={{
              background: `linear-gradient(to right, rgba(255, 255, 255, 0.1) ${project.progress}%, rgba(255, 255, 255, 0) 1%)`,
            }}
            title={`Click to see ${project.name}`}
          >
            <div className="flex gap-x-4 items-center justify-start">
              <CircleState progress={project.progress} />
              <h3 className="text-2xl md:text-3xl">{project.name}</h3>
            </div>
            <p className="text-beige-light">Started by : {project.startedBy}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function CircleState({ progress }: { progress: number }): JSX.Element {
  let bgColor = "bg-yellow-300";

  if (progress === 0) bgColor = "bg-red-300";
  if (progress >= 1) bgColor = "bg-yellow-300";
  if (progress >= 100) bgColor = "bg-green-300";

  return <span className={classNames("w-4 h-4 rounded-full", bgColor)}></span>;
}
