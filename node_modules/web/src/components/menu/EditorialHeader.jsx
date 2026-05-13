export default function EditorialHeader() {
  return (
    <header className="max-w-screen-2xl mx-auto px-8 mb-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <span className="label-md uppercase tracking-[0.2em] text-primary font-bold mb-4 block">Edisi Minggu Ini</span>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter text-on-surface leading-none mb-6">
            Simfoni <br/> <span className="text-primary-container">Rasa &amp; Nutrisi.</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Kurasi menu mingguan yang dirancang oleh ahli gizi untuk mendukung performa tubuh dan kejernihan pikiran Anda. 
          </p>
        </div>
        <div className="lg:col-span-5 relative group">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Gourmet healthy bowl with salmon, avocado, quinoa and fresh greens on a clean marble surface with soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUoEjzlJJVETvKzRVaESz8ryNVxZg7kPMQSCYFpQyA6SLBjRkx1m8rQcQSf9xe3ct5s9rNrXO7Twx8wY3v0gSnFA3dMR4DUgbIs3e837JvHKHiWAvR-pR3vRftRcao8O7OXzYzKKMTGEt2AxETUl8DV3KN1BMmLPErQxHhL49PizXSmVPgeaJYA5zJbhEt-rHFzeb2BDAlG2JOjugRQlAjXgxgoH2IVLCd5CKH8qaCxLarYEU3jVV5QdNbQgL3_eWzQ2Gz-_eSfNw" alt="Gourmet healthy bowl" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-secondary-container p-6 rounded-2xl shadow-xl max-w-[200px]">
            <p className="text-on-secondary-container font-headline font-bold text-xl leading-tight">100% Bahan Organik Lokal</p>
          </div>
        </div>
      </div>
    </header>
  );
}
