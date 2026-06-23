// Data dummy ini dipakai sebagai fallback ketika Supabase belum dikonfigurasi,
// supaya project tetap bisa dijalankan & di-preview sebelum kredensial diisi.

export const fallbackProfile = {
  name: 'Ardi Setiawan',
  role: 'Fullstack Developer',
  bio: 'Gue Ardi Setiawan, mahasiswa Teknik Informatika di UHAMKA. Dari kecil udah suka ngulik komputer dan sekarang jadi fullstack developer yang doyan bikin web app, bot, dan eksplorasi AI. PKL di BPTI UHAMKA, gue bangun AI chatbot dari nol — dan dari situ makin cinta sama dunia tech!',
  email: 'ardi.setiawan@gmail.com',
  github_url: 'https://github.com/ardisetiawan',
  linkedin_url: 'https://linkedin.com/in/ardisetiawan',
  instagram_handle: '@ardisetiawan',
}

export const fallbackSkills = [
  { category: 'Frontend', name: 'JavaScript' },
  { category: 'Frontend', name: 'TypeScript' },
  { category: 'Frontend', name: 'React' },
  { category: 'Frontend', name: 'HTML & CSS' },
  { category: 'Frontend', name: 'Tailwind CSS' },
  { category: 'Backend', name: 'Node.js' },
  { category: 'Backend', name: 'Python' },
  { category: 'Backend', name: 'Flask' },
  { category: 'Backend', name: 'Express' },
  { category: 'Database', name: 'PostgreSQL' },
  { category: 'Database', name: 'MySQL' },
  { category: 'Database', name: 'Google Sheets API' },
  { category: 'AI/ML', name: 'Gemini AI' },
  { category: 'AI/ML', name: 'NLP' },
  { category: 'AI/ML', name: 'RAG' },
  { category: 'Tools & Systems', name: 'Rust' },
  { category: 'Tools & Systems', name: 'WebAssembly' },
  { category: 'Tools & Systems', name: 'Git & GitHub' },
  { category: 'Tools & Systems', name: 'Vercel' },
]

export const fallbackProjects = [
  { id: '1', title: 'UHAMKA Virtual Assistant', description: 'AI-powered FAQ chatbot untuk BPTI UHAMKA. Sentence Transformers, Flask REST API, PostgreSQL, dan frontend HTML/CSS/JS. Gue handle semua dari database design sampai deployment.', url: 'https://vercel.com', repo_url: 'https://github.com', icon: '🤖', stack: ['Python', 'Flask', 'PostgreSQL', 'AI/NLP'], featured: true },
  { id: '2', title: 'ZuppaZuppa Restaurant', description: 'Website restoran fullstack dengan CMS lengkap — JWT auth, upload foto menu, role-based access (Admin & Staff), dan REST API yang clean.', url: 'https://vercel.com', repo_url: 'https://github.com', icon: '🍕', stack: ['Node.js', 'Express', 'MySQL', 'Vercel'], featured: false, images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80'] },
  { id: '3', title: 'Finance Tracker Bot', description: 'Bot Telegram buat tracking keuangan personal pakai AI (Gemini API). Google Sheets sebagai database, deploy gratis 24/7 di Hugging Face Spaces.', url: 'https://huggingface.co', repo_url: 'https://github.com', icon: '💰', stack: ['Python', 'Gemini AI', 'Google Sheets', 'Telegram'], featured: false },
  { id: '4', title: 'Block Blast (WASM Game)', description: 'Game puzzle Block Blast-style yang dibangun dengan Rust + WebAssembly. Logic game ditulis di Rust, dikompilasi ke WASM.', url: 'https://vercel.com', repo_url: 'https://github.com', icon: '🎮', stack: ['Rust', 'WebAssembly', 'JavaScript'], featured: false },
  { id: '5', title: 'RAG Fact-Checker (Riset)', description: "Sistem pengecekan fakta berbasis RAG menggunakan sumber Al-Qur'an dan Hadis. Riset akademik berupa jurnal dan artikel.", url: 'https://github.com', repo_url: 'https://github.com', icon: '📖', stack: ['Python', 'RAG', 'NLP', 'LLM'], featured: false },
  { id: '6', title: 'JEK-MU — Ride Hailing App', description: 'Konsep aplikasi ride-hailing komunitas UHAMKA. Design system lengkap: user flow diagram, komponen UI, color tokens.', url: 'https://github.com', repo_url: 'https://github.com', icon: '🛵', stack: ['UI/UX', 'Figma', 'Design System'], featured: false },
]

export const fallbackExperiences = [
  { id: '1', role: 'Software Engineer Intern (PKL)', company: 'BPTI UHAMKA', period: 'Nov 2025 – Feb 2026', description: 'Membangun UHAMKA Virtual Assistant — AI FAQ chatbot berbasis Sentence Transformers, Flask REST API, PostgreSQL. Handle semua fase: desain DB, backend, frontend, hingga deployment.', tags: ['Python', 'Flask', 'AI', 'PostgreSQL'] },
  { id: '2', role: 'Fullstack Developer (Freelance)', company: 'Independent', period: '2024 – Sekarang', description: 'Membangun berbagai proyek web fullstack: website restoran ZuppaZuppa, sistem CMS, bot Telegram AI. Fokus pada clean code, performa, dan user experience.', tags: ['React', 'Node.js', 'MySQL', 'Vercel'] },
  { id: '3', role: 'Mahasiswa Teknik Informatika', company: 'Universitas Muhammadiyah Prof. DR. HAMKA', period: '2023 – Sekarang', description: 'Aktif dalam riset NLP/sentiment analysis, pengembangan aplikasi, dan kegiatan akademik. Menulis jurnal tentang RAG fact-checking dan sistem AI berbasis sumber Islam.', tags: ['NLP', 'Research', 'AI', 'Academic'] },
]

export const fallbackCertificates = [
  { id: '1', name: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding', year: '2024', url: '' },
  { id: '2', name: 'Belajar Membuat Aplikasi Back-End untuk Pemula', issuer: 'Dicoding', year: '2024', url: '' },
  { id: '3', name: 'Machine Learning for Beginners', issuer: 'Dicoding', year: '2024', url: '' },
  { id: '4', name: 'Python for Data Science & AI', issuer: 'Coursera', year: '2024', url: '' },
  { id: '5', name: 'React — The Complete Guide', issuer: 'Udemy', year: '2023', url: '' },
  { id: '6', name: 'Sertifikat PKL', issuer: 'BPTI UHAMKA', year: '2026', url: '' },
]
