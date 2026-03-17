import { Button } from "@/components/ui/button";
import { ArrowRight, BriefcaseBusiness, Code2, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "REST APIs",
  "Tailwind CSS",
  "System Design",
];

const highlights = [
  { label: "Years of practice", value: "5+" },
  { label: "Projects shipped", value: "32" },
  { label: "Avg. Lighthouse score", value: "97" },
];

const timeline = [
  {
    role: "Senior Frontend Engineer",
    company: "NovaStack",
    period: "2024 - Present",
    detail: "Scaled a multi-tenant dashboard used by 120k+ monthly users with a design-system-first architecture.",
  },
  {
    role: "Full Stack Developer",
    company: "PixelFoundry",
    period: "2021 - 2024",
    detail: "Built hiring and HR automation products end-to-end, reducing manual workflow time by 43%.",
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "2019 - 2021",
    detail: "Delivered marketing and portfolio sites for startups with conversion-focused UX and clean SEO structure.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#f7f3e9_0%,#ecece8_35%,#e4e6dd_65%,#dfe2d8_100%)] text-zinc-900">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-300/35 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16 pt-10 md:px-10">
        <nav className="flex items-center justify-between rounded-full border border-zinc-800/10 bg-white/55 px-4 py-3 backdrop-blur-md animate-[fadeSlide_0.6s_ease-out_forwards]">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-zinc-800">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            RESUME.HOME
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-full border-zinc-800/20 bg-white/70 px-4 text-xs sm:text-sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full bg-zinc-900 px-4 text-xs text-white hover:bg-zinc-800 sm:text-sm">
              <Link href="/register">Create Resume</Link>
            </Button>
          </div>
        </nav>

        <section className="grid items-stretch gap-6 md:grid-cols-[1.4fr_1fr]">
          <article className="rounded-4xl border border-zinc-900/10 bg-white/70 p-8 shadow-xl shadow-zinc-900/5 backdrop-blur-lg animate-[fadeSlide_0.75s_ease-out_forwards]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-900/15 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
              <Code2 className="h-3.5 w-3.5 text-emerald-700" />
              Product-minded engineer available for impactful teams
            </p>

            <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Build a resume homepage
              <span className="block text-emerald-800">that actually gets interviews.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg">
              Showcase your profile with clean storytelling, proof-driven experience, and standout visual polish.
              Designed for hiring managers, recruiters, and product teams that scan fast and decide quickly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-emerald-700 px-5 text-white hover:bg-emerald-600">
                <Link href="/register" className="inline-flex items-center gap-2">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-zinc-900/20 bg-white/70 px-5">
                <Link href="/login" className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Import Existing Resume
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-zinc-900/10 bg-white/75 px-4 py-3">
                  <p className="text-2xl font-semibold text-zinc-900">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.08em] text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-4xl border border-zinc-900/10 bg-zinc-900 p-6 text-zinc-100 shadow-xl shadow-zinc-900/20 animate-[fadeSlide_0.95s_ease-out_forwards]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/25 bg-zinc-800 px-3 py-1 text-xs tracking-widest text-zinc-200">
              <BriefcaseBusiness className="h-3.5 w-3.5 text-emerald-300" />
              EXPERIENCE SNAPSHOT
            </p>
            <div className="space-y-5">
              {timeline.map((item) => (
                <article key={item.role} className="rounded-2xl border border-zinc-200/15 bg-zinc-800/70 p-4">
                  <p className="text-sm text-emerald-300">{item.period}</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">{item.role}</h2>
                  <p className="text-sm text-zinc-300">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.detail}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-4xl border border-zinc-900/10 bg-white/75 p-8 backdrop-blur-lg animate-[fadeSlide_1.15s_ease-out_forwards]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold text-zinc-900">Core Skill Stack</h3>
            <p className="text-sm text-zinc-600">Built for modern product and platform teams</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="rounded-2xl border border-zinc-900/10 bg-linear-to-br from-white to-emerald-50 px-4 py-3 text-center text-sm font-medium text-zinc-800 transition-transform duration-300 hover:-translate-y-1"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
