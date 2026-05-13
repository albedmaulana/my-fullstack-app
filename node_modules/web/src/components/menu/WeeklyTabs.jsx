export default function WeeklyTabs() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 mb-12">
      <div className="flex flex-wrap gap-4 items-center justify-center bg-surface-container-low p-2 rounded-full w-fit mx-auto shadow-sm">
        <button className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 transition-all">Senin</button>
        <button className="px-8 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-all font-semibold">Selasa</button>
        <button className="px-8 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-all font-semibold">Rabu</button>
        <button className="px-8 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-all font-semibold">Kamis</button>
        <button className="px-8 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-all font-semibold">Jumat</button>
      </div>
    </section>
  );
}
