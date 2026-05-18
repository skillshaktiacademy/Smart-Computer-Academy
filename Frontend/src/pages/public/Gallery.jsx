import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutGrid, Image as ImageIcon, Maximize2, 
  X, Filter, ChevronLeft, ChevronRight 
} from "lucide-react";
import Meta from "../../components/common/Meta";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = useMemo(() => ["All", "Campus", "Events", "Lab", "Students"], []);
  
  const images = useMemo(() => [
    { id: 1, src: "/lab_gallery_1_1778041105484.png", category: "Lab", title: "Modern Computing Lab" },
    { id: 2, src: "/event_gallery_1_1778041129181.png", category: "Events", title: "Convocation Ceremony" },
    { id: 3, src: "/about_institute_1778040888613.png", category: "Campus", title: "Main Campus Exterior" },
    { id: 4, src: "/hero_background_1778040868465.png", category: "Students", title: "Interactive Learning Session" },
    // Repeat or add more as needed
    { id: 5, src: "/lab_gallery_1_1778041105484.png", category: "Lab", title: "Advanced IT Infrastructure" },
    { id: 6, src: "/event_gallery_1_1778041129181.png", category: "Events", title: "Student Achievement Awards" },
  ], []);

  const filteredImages = useMemo(() => {
    return images.filter(img => selectedCategory === "All" || img.category === selectedCategory);
  }, [images, selectedCategory]);

  return (
    <>
      <Meta 
        title="Academy Gallery | Campus & Computing Lab Tour" 
        description="Take a visual tour of Smart Computer Academy in Kahalgaon. View high-quality images of our computing labs, spacious classrooms, convocation ceremonies, and campus life." 
        keywords="computer lab Kahalgaon, Smart Computer Academy gallery, Kahalgaon computer center photos, campus tour, educational institute gallery"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Banner */}
        <div className="bg-primary pt-32 pb-24 text-center px-6">
          <div className="container mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white mb-6"
            >
              Visual <span className="text-accent italic">Tour</span>.
            </motion.h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Explore our world-class infrastructure and life at Smart Computer Academy.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-2.5 rounded-full font-black text-sm uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white text-gray-400 hover:text-primary hover:bg-gray-100 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(img)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all aspect-video"
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-accent text-[10px] font-black uppercase tracking-widest mb-2">{img.category}</span>
                    <h4 className="text-white text-xl font-bold">{img.title}</h4>
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center p-6 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={40} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-6xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-auto rounded-3xl shadow-2xl max-h-[80vh] object-contain" 
                />
                <div className="mt-8 text-center text-white">
                  <span className="text-accent text-sm font-black uppercase tracking-widest block mb-2">{selectedImage.category}</span>
                  <h3 className="text-3xl font-bold">{selectedImage.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;
