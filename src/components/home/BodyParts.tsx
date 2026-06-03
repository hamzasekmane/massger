import { bodyParts } from "../../data";
import { Eyebrow, Icons, Section } from "../ui/ui";

export default function BodyParts() {
  return (
    <Section className="py-20">
      <div className="text-center">
        <Eyebrow>Use It Anywhere</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-600 leading-tight text-stone-900 sm:text-5xl">
          Designed For <span className="text-gold-500">Every Part</span>
          <br className="hidden sm:block" /> Of Your Body
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {bodyParts.map((b, i) => (
          <div
            key={b.title}
            className="reveal group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-200/60 transition hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={b.image} alt={`Massager used on ${b.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="font-700 text-stone-900">{b.title}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-100 text-gold-600 transition group-hover:bg-gold-500 group-hover:text-white">
                <Icons.arrow className="h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
