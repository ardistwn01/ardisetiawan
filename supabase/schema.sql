-- ============================================================
-- SKEMA DATABASE PORTOFOLIO ARDI SETIAWAN
-- Jalankan di Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- 1. TABEL PROFILE (data tunggal, 1 baris)
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Ardi Setiawan',
  role text not null default 'Fullstack Developer',
  bio text default '',
  email text default '',
  github_url text default '',
  linkedin_url text default '',
  instagram_handle text default '',
  cv_url text default '',
  updated_at timestamptz default now()
);

-- 2. TABEL SKILLS (dikelompokkan per kategori, tanpa persentase)
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,        -- contoh: 'Frontend', 'Backend', 'Database', 'AI/ML', 'Tools'
  name text not null,            -- contoh: 'React', 'PostgreSQL'
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. TABEL PROJECTS
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text not null,              -- link langsung ke Vercel/GitHub
  repo_url text default '',
  icon text default '🚀',         -- emoji icon
  stack text[] default '{}',      -- array tech stack
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. TABEL EXPERIENCES
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,           -- contoh: 'Nov 2025 – Feb 2026'
  description text default '',
  tags text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 5. TABEL CERTIFICATES
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  year text not null,
  url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Semua orang boleh BACA (untuk tampilan publik portofolio).
-- HANYA user yang sudah login (admin) yang boleh INSERT/UPDATE/DELETE.
-- ============================================================

alter table profile enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;
alter table certificates enable row level security;

-- Policy: semua orang bisa SELECT (read public)
create policy "Public read profile" on profile for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read experiences" on experiences for select using (true);
create policy "Public read certificates" on certificates for select using (true);

-- Policy: hanya authenticated user (admin yang login) yang bisa INSERT/UPDATE/DELETE
create policy "Admin write profile" on profile for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write skills" on skills for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write experiences" on experiences for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write certificates" on certificates for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- DATA AWAL (dummy, silakan diedit lewat dashboard admin nanti)
-- ============================================================

insert into profile (name, role, bio, email, github_url, linkedin_url, instagram_handle)
values (
  'Ardi Setiawan',
  'Fullstack Developer',
  'Gue Ardi Setiawan, mahasiswa Teknik Informatika di UHAMKA. Dari kecil udah suka ngulik komputer dan sekarang jadi fullstack developer yang doyan bikin web app, bot, dan eksplorasi AI. PKL di BPTI UHAMKA, gue bangun AI chatbot dari nol — dan dari situ makin cinta sama dunia tech!',
  'ardi.setiawan@gmail.com',
  'https://github.com/ardisetiawan',
  'https://linkedin.com/in/ardisetiawan',
  '@ardisetiawan'
);

insert into skills (category, name, sort_order) values
('Frontend', 'JavaScript', 1),
('Frontend', 'TypeScript', 2),
('Frontend', 'React', 3),
('Frontend', 'HTML & CSS', 4),
('Frontend', 'Tailwind CSS', 5),
('Backend', 'Node.js', 1),
('Backend', 'Python', 2),
('Backend', 'Flask', 3),
('Backend', 'Express', 4),
('Database', 'PostgreSQL', 1),
('Database', 'MySQL', 2),
('Database', 'Google Sheets API', 3),
('AI/ML', 'Gemini AI', 1),
('AI/ML', 'NLP', 2),
('AI/ML', 'RAG', 3),
('Tools & Systems', 'Rust', 1),
('Tools & Systems', 'WebAssembly', 2),
('Tools & Systems', 'Git & GitHub', 3),
('Tools & Systems', 'Vercel', 4);

insert into projects (title, description, url, repo_url, icon, stack, featured, sort_order) values
('UHAMKA Virtual Assistant', 'AI-powered FAQ chatbot untuk BPTI UHAMKA. Sentence Transformers, Flask REST API, PostgreSQL, dan frontend HTML/CSS/JS. Gue handle semua dari database design sampai deployment.', 'https://vercel.com', 'https://github.com', '🤖', array['Python','Flask','PostgreSQL','AI/NLP'], true, 1),
('ZuppaZuppa Restaurant', 'Website restoran fullstack dengan CMS lengkap — JWT auth, upload foto menu, role-based access (Admin & Staff), dan REST API yang clean.', 'https://vercel.com', 'https://github.com', '🍕', array['Node.js','Express','MySQL','Vercel'], false, 2),
('Finance Tracker Bot', 'Bot Telegram buat tracking keuangan personal pakai AI (Gemini API). Google Sheets sebagai database, deploy gratis 24/7 di Hugging Face Spaces.', 'https://huggingface.co', 'https://github.com', '💰', array['Python','Gemini AI','Google Sheets','Telegram'], false, 3),
('Block Blast (WASM Game)', 'Game puzzle Block Blast-style yang dibangun dengan Rust + WebAssembly. Logic game ditulis di Rust, dikompilasi ke WASM.', 'https://vercel.com', 'https://github.com', '🎮', array['Rust','WebAssembly','JavaScript'], false, 4),
('RAG Fact-Checker (Riset)', 'Sistem pengecekan fakta berbasis RAG menggunakan sumber Al-Qur''an dan Hadis. Riset akademik berupa jurnal dan artikel.', 'https://github.com', 'https://github.com', '📖', array['Python','RAG','NLP','LLM'], false, 5),
('JEK-MU — Ride Hailing App', 'Konsep aplikasi ride-hailing komunitas UHAMKA. Design system lengkap: user flow diagram, komponen UI, color tokens.', 'https://github.com', 'https://github.com', '🛵', array['UI/UX','Figma','Design System'], false, 6);

insert into experiences (role, company, period, description, tags, sort_order) values
('Software Engineer Intern (PKL)', 'BPTI UHAMKA', 'Nov 2025 – Feb 2026', 'Membangun UHAMKA Virtual Assistant — AI FAQ chatbot berbasis Sentence Transformers, Flask REST API, PostgreSQL. Handle semua fase: desain DB, backend, frontend, hingga deployment.', array['Python','Flask','AI','PostgreSQL'], 1),
('Fullstack Developer (Freelance)', 'Independent', '2024 – Sekarang', 'Membangun berbagai proyek web fullstack: website restoran ZuppaZuppa, sistem CMS, bot Telegram AI. Fokus pada clean code, performa, dan user experience.', array['React','Node.js','MySQL','Vercel'], 2),
('Mahasiswa Teknik Informatika', 'Universitas Muhammadiyah Prof. DR. HAMKA', '2023 – Sekarang', 'Aktif dalam riset NLP/sentiment analysis, pengembangan aplikasi, dan kegiatan akademik. Menulis jurnal tentang RAG fact-checking dan sistem AI berbasis sumber Islam.', array['NLP','Research','AI','Academic'], 3);

insert into certificates (name, issuer, year, sort_order) values
('Belajar Dasar Pemrograman Web', 'Dicoding', '2024', 1),
('Belajar Membuat Aplikasi Back-End untuk Pemula', 'Dicoding', '2024', 2),
('Machine Learning for Beginners', 'Dicoding', '2024', 3),
('Python for Data Science & AI', 'Coursera', '2024', 4),
('React — The Complete Guide', 'Udemy', '2023', 5),
('Sertifikat PKL', 'BPTI UHAMKA', '2026', 6);
