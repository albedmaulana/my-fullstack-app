export default function AspirasiInfo() {
  return (
    <div className="lg:col-span-5 space-y-12">
      {/* Illustration Card */}
      <div className="relative group">
        <div className="aspect-square rounded-[2rem] overflow-hidden bg-surface-container shadow-sm">
          <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" data-alt="Modern bright co-working space with organic materials and warm lighting, professional yet friendly community atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAaAd-f3EXDVgYq7Q9_rtjsdAzxoTp-J0w1oLURxYk73CLb_Sozk1otDavue6V3XwRwPdEc6EiQ2rmY6rLr90zrXBrdMrOZ_3EwZoX_FbcdmqCnxL8zS3l_DvrmxZEglF252wOGQBkGC9eIHXI88vo0DGjMHDoxJX2YQ6xDpstodzZMmx69L6JmjmGHv_Owo1abFNtEv5zikiila4w6MOk3-DptZYrB68u0twc2HnXaAmNZhO23me3xwh2jyLkwo9HHGLzTi8yKjY" alt="Community impact illustration" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
        </div>
        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4 mb-2">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
            <h3 className="font-bold text-lg text-on-surface font-headline">Community Impact</h3>
          </div>
          <p className="text-sm text-on-surface-variant font-body">Suara Anda membantu ribuan anak mendapatkan nutrisi yang lebih baik setiap harinya.</p>
        </div>
      </div>
      
      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-start gap-6 p-6 rounded-2xl bg-surface-container-lowest transition-all hover:bg-white border border-transparent hover:border-outline-variant/15">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-1 font-headline">Alamat Kantor</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">Jl. Kebon Sirih No. 45, Menteng, Jakarta Pusat, DKI Jakarta 10340</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-2xl bg-surface-container-lowest transition-all hover:bg-white border border-transparent hover:border-outline-variant/15">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-1 font-headline">Email Resmi</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">halo@makananbergizi.go.id</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-2xl bg-surface-container-lowest transition-all hover:bg-white border border-transparent hover:border-outline-variant/15">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-1 font-headline">Layanan Telepon</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">(021) 555-0123 / +62 812-3456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}
