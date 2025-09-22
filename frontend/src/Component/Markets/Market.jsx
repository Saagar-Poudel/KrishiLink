import { useState, useEffect } from "react";
import { Store, TrendingUp, Users, Leaf } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/Authcontext";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import FarmerChatBox from "../FarmerChatbox";
import Chatbox from "../Chatbox";
import { useToast } from "../../hooks/use-toast";
import { useCart } from "../../contexts/CartContex";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Market = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  const [farmerChatOpen, setFarmerChatOpen] = useState(false);
  const [chatFarmer, setChatFarmer] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/products/");
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
  const fetchWishlist = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`http://localhost:3000/api/wishlist/${user.id}`);
      const data = await res.json();

      // Normalize to array of product IDs
      const productIds = data.map((item) => item.id);
      setWishlistedProducts(productIds);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
    }
  };

  fetchWishlist();
}, [user?.id]);

  useEffect(() => {
    fetch(`/api/wishlist/${user?.id}`)
      .then((res) => res.json())
      .then((data) => setWishlistedProducts(data.map((p) => p.id)));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
    }
  }, [location.search]);

  useEffect(() => {
    filterProducts();
  }, [filters]);
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (product) =>
          (product.name || "")
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          (product.category || "")
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          (product.sellerName || "")
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          product.nameNepali
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.location && filters.location !== "all")
      filtered = filtered.filter((p) => p.location.includes(filters.location));
    if (filters.priceRange)
      filtered = filtered.filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    if (filters.certifications && filters.certifications.length > 0) {
      filtered = filtered.filter((product) => {
        if (filters.certifications.includes(t("Organic")) && !product.isOrganic)
          return false;
        if (
          filters.certifications.includes(t("Government Approved")) &&
          !product.isVerified
        )
          return false;
        return true;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleToggleWishlist = async (productId) => {
    const isAlready = wishlistedProducts.includes(productId);

    if (isAlready) {
      await fetch("http://localhost:3000/api/wishlist/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      setWishlistedProducts((prev) => prev.filter((id) => id !== productId));
    } else {
      await fetch("http://localhost:3000/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      setWishlistedProducts((prev) => [...prev, productId]);
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    toast({
      title: t("Added to Cart"),
      description: t(
        `${quantity} ${product.unit} of ${product.name} added to cart.`
      ),
    });
  };

  const handleChatWithSeller = (farmerData) => {
    setChatFarmer(farmerData); // set seller data
    setFarmerChatOpen(true); // open FarmerChatBox
    setTimeout(() => setSelectedProduct(null)); // close modal
  };

  const stats = [
    { icon: Store, label: t("Active Sellers"), value: "2,500+" },
    { icon: Leaf, label: t("Organic Products"), value: "1,200+" },
    { icon: TrendingUp, label: t("Daily Transactions"), value: "850+" },
    { icon: Users, label: t("Happy Customers"), value: "15,000+" },
  ];

  return (
    <div className="w-full dark:bg-[#0B1A12] dark:text-[#F9FAFB]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-30">
              <Filters
                onFiltersChange={(newFilter) =>
                  setFilters((prev) => ({ ...prev, ...newFilter }))
                }
              />
            </div>
          </div>
          <Chatbox currentUser={user} />

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold dark:text-[#F9FAFB]">
                  {t("Products")}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="px-2 py-1 rounded bg-gray-200 dark:bg-[#12241A] text-gray-800 dark:text-[#F9FAFB] text-sm">
                    {filteredProducts.length} {t("products found")}
                  </div>
                </div>
              </div>
              <hr className="border-t border-gray-200 dark:border-[#1F2937]" />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-9">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlistedProducts.includes(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground dark:text-[#D1D5DB] text-lg">
                  {t("No products found")}
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#9CA3AF] mt-2">
                  {t("Try adjusting your filters")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={wishlistedProducts.includes(selectedProduct?.id)}
        onChatWithSeller={handleChatWithSeller}
      />

      {/* Stats Section */}
      <div className="bg-primary dark:bg-[#12241A] text-primary-foreground dark:text-[#F9FAFB] py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl shadow-lg p-6 text-center text-green-800 dark:text-[#34D399] transition-transform transform hover:-translate-y-2 hover:shadow-xl"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary-foreground/90 dark:text-[#FACC15]" />
                <div className="text-3xl font-extrabold">{stat.value}</div>
                <div className="text-sm opacity-80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {farmerChatOpen && chatFarmer && (
        <FarmerChatBox
          currentUser={user} // buyer
          otherUser={chatFarmer} // farmer
          isOpen={farmerChatOpen}
          onClose={() => setFarmerChatOpen(false)}
        />
      )}
    </div>
  );
};

export default Market;
