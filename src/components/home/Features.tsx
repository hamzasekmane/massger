import { Eyebrow, Icons } from "../ui/ui";

const list = [
  { icon: Icons.levels, title: "9 Adjustable Levels", desc: "From gentle to deep intensity" },
  { icon: Icons.heat, title: "Smart Heat Therapy", desc: "Promotes circulation & relief" },
  { icon: Icons.suction, title: "Deep Suction Power", desc: "Targets deep muscle tension" },
  { icon: Icons.touch, title: "One-Touch Control", desc: "Easy to use for everyone" },
];

const arcs = [
  { range: "1-3", label: "Gentle Massage", pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-2 text-center" },
  { range: "7-9", label: "Deep Therapy", pos: "left-0 top-1/2 -translate-y-1/2 text-left" },
  { range: "4-6", label: "Daily Relaxation", pos: "right-0 top-1/2 -translate-y-1/2 text-right" },
];

export default function Features() {
  return (
    <section id="features" className="bg-sand py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Smart Features</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-600 leading-tight text-stone-900 sm:text-5xl">
            9-Level Strength
            <br />
            For Your <span className="text-gold-500">Perfect Comfort</span>
          </h2>

          <div className="mt-9 space-y-6">
            {list.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold-500 shadow-sm ring-1 ring-stone-200/70">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-700 text-stone-900">{f.title}</h3>
                  <p className="text-sm text-stone-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm reveal">
          {arcs.map((a) => (
            <div key={a.range} className={`absolute z-10 ${a.pos}`}>
              <p className="font-display text-2xl font-600 text-gold-500">{a.range}</p>
              <p className="text-xs font-600 uppercase tracking-wider text-stone-500">{a.label}</p>
            </div>
          ))}
          <div className="mx-auto aspect-square w-[72%] overflow-hidden rounded-full bg-white shadow-2xl shadow-stone-300/60 ring-8 ring-white">
            <img src="/images/device-closeup.jpg" alt="Massager control panel close-up" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
