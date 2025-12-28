import Link from "next/link";
import {
  Music,
  PartyPopper,
  Palette,
  Flag,
  Briefcase,
  Film,
} from "lucide-react";

const categories = [
  { name: "Music", icon: Music },
  { name: "Nightlife", icon: PartyPopper },
  { name: "Arts", icon: Palette },
  { name: "Racing", icon: Flag },
  { name: "Business", icon: Briefcase },
  { name: "Movies", icon: Film },
];

export default function SecondMainSec() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Category Event</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/events?category=${encodeURIComponent(cat.name)}`}
            className="group rounded-xl border bg-white p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition"
          >
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition">
              <cat.icon className="text-blue-500 group-hover:text-white" size={26} />
            </div>

            <span className="font-semibold text-sm">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}