export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  span: string; // e.g., 'md:col-span-7' or 'md:col-span-5'
  aspect: string; // e.g., 'aspect-[4/3]'
  image: string;
  description: string;
  client?: string;
  role?: string;
  tech?: string[];
  link?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  rotation: string;
  column: 1 | 2;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}
