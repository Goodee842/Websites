import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Camera } from 'lucide-react';
import heroParfaitImg from '../assets/images/Homepage.jpg';
import mangoBlissImg from '../assets/images/mango_bliss_1788947639820.jpg';
import berryCrunchImg from '../assets/images/berry_crunch_1788947660509.jpg';
import tropicalMixImg from '../assets/images/tropical_mix_1788947685171.jpg';
import brandStoryImg from '../assets/images/brand_story_1788947702546.jpg';

export const InstagramMoments: React.FC = () => {
  const posts = [
    {
      id: 1,
      image: heroParfaitImg,
      caption: 'Freshly batched Fruity Nest Parfaits ready for immediate dispatch! 🍓🥣✨',
      likes: 342,
      comments: 29,
    },
    {
      id: 2,
      image: mangoBlissImg,
      caption: 'Golden Nigerian mangoes meeting creamy Greek bliss. Who is craving this today? 🥭',
      likes: 489,
      comments: 42,
    },
    {
      id: 3,
      image: brandStoryImg,
      caption: 'Fresh fruit prep in the kitchen before dawn. Real ingredients only! 🥣🌿',
      likes: 512,
      comments: 37,
    },
    {
      id: 4,
      image: berryCrunchImg,
      caption: 'Antioxidant heaven! Strawberries, raspberries, and slow-baked granola. 🫐❤️',
      likes: 620,
      comments: 54,
    },
  ];

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#F7F5EE] border-t border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#173F2E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Social Feed</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173F2E] tracking-tight">
            Fruity Nest Moments 📸
          </h2>
          <p className="text-[#5D7A68] text-sm sm:text-base mt-2">
            Follow our daily parfait creations, behind-the-scenes kitchen preps, and happy customer spoons.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              href="https://www.instagram.com/fruity_nest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2DDD0] text-xs sm:text-sm font-semibold text-[#173F2E] hover:text-[#E1306C] hover:border-[#E1306C]/40 transition-all shadow-2xs"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>@fruity_nest</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://www.facebook.com/p/Fruity-Nest-61574655906447/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2DDD0] text-xs sm:text-sm font-semibold text-[#173F2E] hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Fruity Nest on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-[#E6E1D4]"
            >
              <img
                src={post.image}
                alt="Fruity Nest Instagram moment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover overlay with IG engagement */}
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-5 h-5 text-white/90" />
                </div>
                <div>
                  <p className="text-xs line-clamp-2 text-white/95 leading-tight mb-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-white/80" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
