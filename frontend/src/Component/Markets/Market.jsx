import React, { useState, useEffect } from "react";
import { Store, TrendingUp, Users, Leaf } from "lucide-react";
import { useLanguage } from '../../contexts/LanguageContext';
import Filters from './Filters';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useToast } from "../../hooks/use-toast";

const Market = () => {
 const { t } = useLanguage();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
   const { toast } = useToast(); 

  // Sample products data
  const products = [
   {
      id: "1",
      name: "Organic Tomatoes",
      nameNepali: "जैविक गोलभेडा",
      category: "Vegetables",
      price: 120,
      unit: "kg",
      quantity: 500,
      location: "Chitwan, Nepal",
      sellerName: "Ram Prasad Farmer",
      image: "/Images/land.jpg",
      isVerified: true,
      isAvailable: true,
      hasDelivery: true,
      rating: 4.8,
      reviewCount: 24,
      isOrganic: true,
      isBulkAvailable: true,
      estimatedDelivery: "2-3 days"
    },
    {
      id: "2",
      name: "Fresh Vegetables Mix",
      nameNepali: "ताजा तरकारी मिक्स",
      category: "Vegetables",
      price: 80,
      unit: "kg",
      quantity: 200,
      location: "Kathmandu, Nepal",
      sellerName: "Sita Cooperative",
      image: '/Images/vegatables.jpeg',
      isVerified: true,
      isAvailable: true,
      hasDelivery: true,
      rating: 4.6,
      reviewCount: 18,
      isOrganic: false,
      isBulkAvailable: true,
      estimatedDelivery: "1-2 days"
    },
    {
      id: "3",
      name: "Golden Wheat",
      nameNepali: "सुनौलो गहुँ",
      category: "Grains",
      price: 45,
      unit: "kg",
      quantity: 1000,
      location: "Rupandehi, Nepal",
      sellerName: "Krishna Agro Farm",
      image: "/Images/land.jpg",
      isVerified: true,
      isAvailable: true,
      hasDelivery: true,
      rating: 4.9,
      reviewCount: 35,
      isOrganic: false,
      isBulkAvailable: true,
      estimatedDelivery: "3-5 days"
    },
    {
      id: "4",
      name: "Premium Tomatoes",
      nameNepali: "प्रिमियम गोलभेडा",
      category: "Vegetables",
      price: 150,
      unit: "kg",
      quantity: 0,
      location: "Pokhara, Nepal",
      sellerName: "Himalaya Farmers",
      image: "/Images/Drinks.jpg",
      isVerified: false,
      isAvailable: false,
      hasDelivery: false,
      rating: 4.2,
      reviewCount: 12,
      isOrganic: true,
      isBulkAvailable: false,
      estimatedDelivery: "Pickup only"
    }
  ];

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  useEffect(() => {
  setFilteredProducts(products);
}, []);

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.sellerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.nameNepali?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    } 


    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((product) => product.location.includes(filters.location));
    }

    if (filters.priceRange) {
      filtered = filtered.filter((product) =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    if (filters.certifications && filters.certifications.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.certifications.includes(t("Organic")) && !product.isOrganic) return false;
        if (filters.certifications.includes(t("Government Approved")) && !product.isVerified) return false;
        return true;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    toast({
      title: t("Added to Cart"),
      description: t(`${quantity} ${product.unit} of ${product.name} added to cart.`),
    });
  };

  const handleToggleWishlist = (productId) => {
    if (wishlistedProducts.includes(productId)) {
      setWishlistedProducts(wishlistedProducts.filter(id => id !== productId));
      toast({
        title: t("Removed from Wishlist"),
        description: t("Product removed from your wishlist."),
      });
    } else {
      setWishlistedProducts([...wishlistedProducts, productId]);
      toast({
        title: t("Added to Wishlist"),
        description: t("Product added to your wishlist."),
      });
    }
  };

  const stats = [
    { icon: Store, label: t("Active Sellers"), value: "2,500+", color: "text-primary" },
    { icon: Leaf, label: t("Organic Products"), value: "1,200+", color: "text-success" },
    { icon: TrendingUp, label: t("Daily Transactions"), value: "850+", color: "text-accent" },
    { icon: Users, label: t("Happy Customers"), value: "15,000+", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-background  dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="public/images/Drinks.jpg"
          alt={t("Smart Agriculture Marketplace")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              {t("Smart Agriculture Marketplace")}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t("Connecting Farmers Directly to Consumers")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            {/* <Filters onFiltersChange={setFilters} />  */}
            <Filters
              onFiltersChange={(newFilter) =>
                setFilters((prev) => ({ ...prev, ...newFilter }))
              }
            />       {/* market place filter change garako yeha */}
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  {t("Products")}
                </h2>
                <div className="flex items-center gap-4">
                  <div variant="secondary" className="px-2 py-1 rounded bg-gray-200 text-gray-800 text-sm">
                    {filteredProducts.length} {t("products found")}
                  </div>
                </div>
              </div>
              <hr className="border-t border-gray-200" />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <p className="text-muted-foreground text-lg">
                  {t("No products found")}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
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
        isWishlisted={selectedProduct ? wishlistedProducts.includes(selectedProduct.id) : false}
      />
    </div>
  );
};

export default Market;