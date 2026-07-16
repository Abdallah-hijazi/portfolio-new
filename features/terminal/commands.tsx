import type { ReactNode } from "react";

import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { site } from "@/lib/site";

export interface CommandResult {
  output: ReactNode;
  /** Side effects the terminal host should perform. */
  action?: "clear" | { navigate: string } | { openExternal: string };
}

interface CommandDef {
  name: string;
  description: string;
  run: (args: string[]) => CommandResult;
}

function Line({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>;
}

function Dim({ children }: { children: ReactNode }) {
  return <span className="text-terminal-dim">{children}</span>;
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-terminal-amber">{children}</span>;
}

const commandList: CommandDef[] = [
  {
    name: "help",
    description: "List available commands",
    run: () => ({
      output: (
        <div className="space-y-1">
          <Line>
            <Dim># Available commands</Dim>
          </Line>
          {commandRegistryOrdered().map((cmd) => (
            <Line key={cmd.name}>
              <span className="inline-block w-28 text-terminal-green">
                {cmd.name}
              </span>
              <Dim>{cmd.description}</Dim>
            </Line>
          ))}
          <Line>
            <Dim>
              Tip: try <Accent>projects</Accent> then{" "}
              <Accent>open &lt;slug&gt;</Accent>.
            </Dim>
          </Line>
        </div>
      ),
    }),
  },
  {
    name: "whoami",
    description: "Identity summary",
    run: () => ({
      output: (
        <div className="space-y-1">
          <Line>
            <Accent>{site.name.toLowerCase().replace(" ", "@")}</Accent> —{" "}
            {site.role}
          </Line>
          <Line>{profile.summary}</Line>
          <Line>
            <Dim>location:</Dim> {site.location} · <Dim>education:</Dim> B.Sc.
            Computer Science, CNAM (GPA 3.8)
          </Line>
        </div>
      ),
    }),
  },
  {
    name: "skills",
    description: "Skill matrix by category",
    run: () => ({
      output: (
        <div className="space-y-2">
          {skillCategories.map((cat) => (
            <div key={cat.id}>
              <Line>
                <Accent>[{cat.label}]</Accent>
              </Line>
              <Line>
                {cat.skills.map((s) => s.name).join(" · ")}
              </Line>
            </div>
          ))}
        </div>
      ),
    }),
  },
  {
    name: "projects",
    description: "List projects with slugs",
    run: () => ({
      output: (
        <div className="space-y-1">
          {projects.map((p) => (
            <Line key={p.slug}>
              <span className="inline-block w-72 truncate text-terminal-green">
                {p.slug}
              </span>
              <Dim>
                {p.year} · {p.category}
              </Dim>
            </Line>
          ))}
          <Line>
            <Dim>
              run <Accent>open &lt;slug&gt;</Accent> to view a case study
            </Dim>
          </Line>
        </div>
      ),
    }),
  },
  {
    name: "open",
    description: "Open a project case study: open <slug>",
    run: (args) => {
      const slug = args[0];
      if (!slug) {
        return {
          output: (
            <Line>
              usage: <Accent>open &lt;slug&gt;</Accent> — list slugs with{" "}
              <Accent>projects</Accent>
            </Line>
          ),
        };
      }
      const project = projects.find((p) => p.slug === slug);
      if (!project) {
        return {
          output: (
            <Line>
              <span className="text-terminal-red">error:</span> project &quot;
              {slug}&quot; not found
            </Line>
          ),
        };
      }
      return {
        output: <Line>opening {project.title} …</Line>,
        action: { navigate: `/projects/${project.slug}` },
      };
    },
  },
  {
    name: "experience",
    description: "Employment history",
    run: () => ({
      output: (
        <div className="space-y-2">
          {experience.map((e) => (
            <div key={e.id}>
              <Line>
                <Accent>{e.role}</Accent> @ {e.company}
              </Line>
              <Line>
                <Dim>
                  {e.start} — {e.end ?? "present"} · {e.type}
                </Dim>
              </Line>
            </div>
          ))}
        </div>
      ),
    }),
  },
  {
    name: "certs",
    description: "Certifications & credentials",
    run: () => ({
      output: (
        <div className="space-y-1">
          {certifications.map((c) => (
            <Line key={c.id}>
              <span className="inline-block w-10">
                <Dim>{c.year}</Dim>
              </span>
              <span className="text-terminal-green">{c.title}</span>{" "}
              <Dim>· {c.issuer}</Dim>
              {c.highlight ? <Accent> ★ {c.highlight}</Accent> : null}
            </Line>
          ))}
        </div>
      ),
    }),
  },
  {
    name: "contact",
    description: "Contact channels",
    run: () => ({
      output: (
        <div className="space-y-1">
          <Line>
            <Dim>email:</Dim>{" "}
            <a className="underline decoration-terminal-dim underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </Line>
          <Line>
            <Dim>phone:</Dim> {site.phone}
          </Line>
          <Line>
            <Dim>github:</Dim> {site.social.github}
          </Line>
          <Line>
            <Dim>linkedin:</Dim> {site.social.linkedin}
          </Line>
        </div>
      ),
    }),
  },
  {
    name: "github",
    description: "Open GitHub profile",
    run: () => ({
      output: <Line>opening github profile …</Line>,
      action: { openExternal: site.social.github },
    }),
  },
  {
    name: "linkedin",
    description: "Open LinkedIn profile",
    run: () => ({
      output: <Line>opening linkedin profile …</Line>,
      action: { openExternal: site.social.linkedin },
    }),
  },
  {
    name: "resume",
    description: "Open the resume page",
    run: () => ({
      output: <Line>loading resume …</Line>,
      action: { navigate: "/resume" },
    }),
  },
  {
    name: "banner",
    description: "Print the banner",
    run: () => ({
      output: (
        <pre className="whitespace-pre leading-tight text-terminal-green" aria-hidden>
          {String.raw`   _   _   _ 
  /_\ | |_| |
 / _ \|  _  |  abdallah hijazi
/_/ \_\_| |_|  security workspace v1.0`}
        </pre>
      ),
    }),
  },
  {
    name: "clear",
    description: "Clear the terminal",
    run: () => ({ output: null, action: "clear" }),
  },
];

function commandRegistryOrdered(): CommandDef[] {
  return commandList;
}

export const commandNames = commandList.map((c) => c.name);

export function executeCommand(input: string): CommandResult {
  const [name, ...args] = input.trim().split(/\s+/);
  const command = commandList.find(
    (c) => c.name === name.toLowerCase(),
  );
  if (!command) {
    return {
      output: (
        <Line>
          <span className="text-terminal-red">command not found:</span> {name}{" "}
          <Dim>
            — try <Accent>help</Accent>
          </Dim>
        </Line>
      ),
    };
  }
  return command.run(args);
}
