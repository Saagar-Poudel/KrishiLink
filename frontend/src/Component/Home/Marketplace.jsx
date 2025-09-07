import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Star, Truck, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories = [
    { id: "vegetables", name: t("Vegetables"), image: "/Images/vegetables.jpeg" },
    { id: "fruits", name: t("Fruits"), image: "/Images/Fruits.jpg" },
    { id: "grains", name: t("Grains"), image: "/Images/Drinks.jpg" },
    { id: "nuts", name: t("Livestock"), image: "/Images/land.jpg" },
    { id: "fish", name: t("Seeds"), image: "/Images/land.jpg" },
    { id: "meat", name: t("Tools"), image: "/Images/land.jpg" },
  ];

  // carousel state
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // left-most visible item index
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // touch dragging
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const isDragging = useRef(false);

  // compute itemsPerView based on window width (responsive)
  const computeItemsPerView = (w) => {
    // tweak these breakpoints as you like
    if (w >= 1280) return 6;   // large desktop
    if (w >= 1024) return 5;   // desktop
    if (w >= 768) return 4;    // tablet
    if (w >= 640) return 3;    // small tablet / large phone
    return 2;                  // phone
  };

  // measure container and item widths
  useLayoutEffect(() => {
    const resize = () => {
      const w = containerRef.current?.clientWidth || 0;
      const ipv = computeItemsPerView(window.innerWidth);
      setItemsPerView(ipv);
      setContainerWidth(w);
      setItemWidth(ipv > 0 ? w / ipv : 0);

      // ensure currentIndex in bounds after resize
      const maxIndex = Math.max(0, categories.length - ipv);
      setCurrentIndex((ci) => Math.min(ci, maxIndex));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  // autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const maxIndex = Math.max(0, categories.length - itemsPerView);
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [isAutoPlaying, itemsPerView, categories.length]);

  // helper handlers
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    resumeAutoPlayLater();
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    resumeAutoPlayLater();
  };

  const handleDotClick = (pageIndex) => {
    setIsAutoPlaying(false);
    // pageIndex is page number (0..pages-1). Convert to left-most item index:
    const index = pageIndex * itemsPerView;
    setCurrentIndex(Math.min(index, maxIndex));
    resumeAutoPlayLater();
  };

  function resumeAutoPlayLater() {
    // resume autoplay after a pause (user interacted)
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setIsAutoPlaying(false);
    isDragging.current = true;
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    touchDelta.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    touchDelta.current = x - touchStartX.current;
    // visual feedback: translate track by touchDelta (don't commit index yet)
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(${-currentIndex * itemWidth + touchDelta.current}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // threshold to consider swipe
    const threshold = Math.max(20, itemWidth * 0.15); // 15% of item or 20px
    if (touchDelta.current > threshold) {
      // swipe right -> previous
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    } else if (touchDelta.current < -threshold) {
      // swipe left -> next
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    } else {
      // small/insufficient swipe, snap back (no index change)
      setCurrentIndex((prev) => prev);
    }

    // restore transition and resume transform in effect
    if (trackRef.current) {
      setTimeout(() => {
        trackRef.current.style.transition = "";
      }, 50);
    }

    touchDelta.current = 0;
    resumeAutoPlayLater();
  };

  // update transform when currentIndex or itemWidth change (except during active drag)
  useEffect(() => {
    if (!trackRef.current) return;
    if (isDragging.current) return; // don't override while dragging
    const tx = -currentIndex * itemWidth;
    trackRef.current.style.transition = "transform 450ms cubic-bezier(.2,.9,.2,1)";
    trackRef.current.style.transform = `translateX(${tx}px)`;
  }, [currentIndex, itemWidth]);

  // compute number of pages for dots (pages = ceil(categories/itemsPerView))
  const pages = Math.max(1, Math.ceil(categories.length / itemsPerView));

  // Category card
  const CategoryCard = ({ category }) => (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105 text-center h-full">
      <div className="bg-white dark:bg-[#12241A] rounded-lg overflow-hidden shadow-sm hover:shadow-lg w-full"
           style={{ height: "160px" /* fixed height but responsive below via media queries */ }}>
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        {category.name}
      </h3>
    </div>
  );

  return (
    <section id="marketplace" className="py-12 sm:py-16 bg-white dark:bg-[#0B1A12]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t("marketplaceTitle")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("marketplaceSubtitle")}
          </p>
        </div>

        {/* Category Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">
            {t("Category")}
          </h2>

          <div
            ref={containerRef}
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            // touch handlers
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            // mouse drag support (basic)
            onMouseDown={(e) => onTouchStart({ touches: [{ clientX: e.clientX }] })}
            onMouseMove={(e) => { if (isDragging.current) onTouchMove({ clientX: e.clientX }); }}
            onMouseUp={onTouchEnd}
            onMouseLeave={() => { if (isDragging.current) onTouchEnd(); setIsAutoPlaying(true); }}
          >
            {/* Track */}
            <div
              ref={trackRef}
              className="flex gap-4 will-change-transform"
              style={{
                // width: total items * itemWidth (in px) — using inline style for accurate translation
                width: containerWidth && itemWidth ? `${categories.length * itemWidth}px` : "100%",
              }}
            >
              {categories.map((category, idx) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 px-2"
                  style={{
                    width: itemWidth ? `${itemWidth}px` : `${100 / itemsPerView}%`,
                    boxSizing: "border-box",
                  }}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              aria-label="Previous categories"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700 rounded-full shadow px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button>

            <button
              aria-label="Next categories"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700 rounded-full shadow px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button>
          </div>

          {/* Dots (pages) */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: pages }).map((_, pageIdx) => {
              const pageStartIndex = pageIdx * itemsPerView;
              const isActive = currentIndex >= pageStartIndex && currentIndex < pageStartIndex + itemsPerView;
              return (
                <button
                  key={pageIdx}
                  onClick={() => handleDotClick(pageIdx)}
                  className={`mx-1 w-3 h-3 rounded-full transition-colors ${
                    isActive ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to page ${pageIdx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gray-100 dark:bg-[#12241A] rounded-lg">
            <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Fast Delivery")}</h4>
            <p className="text-sm text-gray-600 dark:text-green-400">{t("Quick and reliable delivery to your doorstep")}</p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-[#12241A] rounded-lg">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Quality Assured")}</h4>
            <p className="text-sm text-gray-600 dark:text-green-400">{t("Verified sellers and quality-checked products")}</p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-[#12241A] rounded-lg">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Best Prices")}</h4>
            <p className="text-sm text-gray-600 dark:text-green-400">{t("Competitive pricing directly from farmers")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/market")}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center mx-auto"
          >
            {t("All available products")}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;