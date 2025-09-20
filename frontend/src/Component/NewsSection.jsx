import { useEffect, useState } from "react";
import { Calendar, ExternalLink, Bell } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const NewsSection = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/news"); // adjust port/path
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();

        // newsdata.io returns { results: [...] }
        setNews(data.results || []);
      } catch (err) {
        console.error(err);
        setError("समाचार लोड गर्न समस्या भयो।");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case "food":
        return "bg-green-600 text-white";
      case "technology":
        return "bg-blue-600 text-white";
      case "research":
        return "bg-yellow-500 text-white";
      case "insurance":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p>समाचार लोड हुँदैछ...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section
      id="news"
      className="py-16 bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-[#34D399] mb-4">
            {t("newsTitle")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("newsSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {news.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#12241A] border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-gray-200 dark:border-[#1F2937]"
            >
              <div className="p-6 border-b border-gray-200 dark:border-[#374151]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-tight flex-1 dark:text-[#F9FAFB]">
                    {item.urgent && (
                      <Bell className="h-4 w-4 text-orange-500 dark:text-[#F59E0B] inline mr-2" />
                    )}
                    {item.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.pubDate}
                  </div>
                  <div>{item.source_id}</div>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full px-4 py-2 bg-white dark:bg-[#0B1A12] border border-gray-300 dark:border-[#374151] rounded-md hover:bg-gray-50 dark:hover:bg-[#12241A] transition-colors flex items-center justify-center text-green-700 dark:text-[#34D399]"
                >
                  पूरा पढ्नुहोस्
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
