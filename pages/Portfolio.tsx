import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { projects as staticProjects, type Project } from '../data/projects';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [activeImage, setActiveImage] = useState(0);
  const mainImage = project.images[activeImage] ?? project.images[0];
  const thumbnails = project.images.slice(1);

  return (
    <article className="group flex flex-col lg:flex-row gap-0 bg-[#111111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:border-[#e09d37]/20">

      {/* Foto kolom */}
      <div className="lg:w-[55%] flex flex-col">
        <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:flex-1">
          <img
            key={activeImage}
            src={mainImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <span className="absolute top-5 left-5 bg-[#e09d37] text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm">
            {project.category}
          </span>
        </div>

        {/* Thumbnails */}
        {thumbnails.length > 0 && (
          <div className="flex gap-2 p-3 bg-[#0d0d0d]">
            <button
              onClick={() => setActiveImage(0)}
              className={`relative h-16 flex-1 overflow-hidden rounded-sm border-2 transition-colors ${activeImage === 0 ? 'border-[#e09d37]' : 'border-transparent opacity-50 hover:opacity-80'}`}
            >
              <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
            </button>
            {thumbnails.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i + 1)}
                className={`relative h-16 flex-1 overflow-hidden rounded-sm border-2 transition-colors ${activeImage === i + 1 ? 'border-[#e09d37]' : 'border-transparent opacity-50 hover:opacity-80'}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tekst kolom */}
      <div className="lg:w-[45%] p-10 lg:p-14 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#e09d37] text-[10px] font-black uppercase tracking-[0.3em]">
              {project.category}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              {project.date}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight mb-6">
            {project.title}
          </h2>

          <div className="w-10 h-[3px] bg-[#e09d37] mb-8 rounded-full" />

          <p className="text-gray-300 text-base leading-relaxed font-normal mb-8">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
            <i className="fas fa-map-marker-alt text-[#e09d37] text-xs w-4" />
            {project.location}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            to="/offerte"
            className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:text-[#e09d37] transition-all group/link mt-2 w-fit"
          >
            Vraag een offerte aan
            <i className="fas fa-arrow-right transform group-hover/link:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setProjects(staticProjects);
      setLoading(false);
      return;
    }

    supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjects((data as Project[]) ?? staticProjects);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#0a0a0a] pb-32">
      {/* Hero */}
      <section className="bg-[#111111] py-40 border-b border-white/5 mb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[11px] mb-6 block">
            Uitgevoerde projecten
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter uppercase text-white">
            REALISATIES
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Een selectie van recent uitgevoerde werkzaamheden — van renovatie tot nieuwbouw.
          </p>
        </div>
      </section>

      {/* Project lijst */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {loading ? (
          <div className="flex justify-center py-24">
            <i className="fas fa-circle-notch fa-spin text-[#e09d37] text-3xl" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-center py-24">
            Projecten worden binnenkort toegevoegd.
          </p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio;
