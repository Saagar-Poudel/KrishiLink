
import { MapPin, Star, ShoppingCart, Filter, ArrowRight,Truck, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Marketplace = () => {
  const { t } = useLanguage();
  
  const products = [
    {
      id: 1,
      name: 'जैविक धान',
      price: '२५००',
      unit: 'प्रति क्विन्टल',
      location: 'चितवन',
      rating: 4.8,
      reviews: 124,
      seller: 'राम बहादुर',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      category: 'अन्न',
      inStock: true,
      quantity: '१०० क्विन्टल'
    },
    {
      id: 2,
      name: 'ताजा टमाटर',
      price: '८०',
      unit: 'प्रति केजी',
      location: 'काभ्रे',
      rating: 4.6,
      reviews: 89,
      seller: 'सीता देवी',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      category: 'तरकारी',
      inStock: true,
      quantity: '५०० केजी'
    },
    {
      id: 3,
      name: 'आलु',
      price: '४५',
      unit: 'प्रति केजी',
      location: 'सिन्धुपाल्चोक',
      rating: 4.5,
      reviews: 67,
      seller: 'हरि प्रसाद',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      category: 'तरकारी',
      inStock: false,
      quantity: 'स्टकमा छैन'
    },
    {
      id: 4,
      name: 'केरा',
      price: '१२०',
      unit: 'प्रति दर्जन',
      location: 'मोरङ',
      rating: 4.9,
      reviews: 156,
      seller: 'गीता शर्मा',
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400',
      category: 'फलफूल',
      inStock: true,
      quantity: '२०० दर्जन'
    }
  ];

  const categories = ['सबै', 'अन्न', 'तरकारी', 'फलफूल', 'मसला', 'दाल'];

return (
  <section id="marketplace" className="py-16 bg-white ">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
           {t('marketplaceTitle')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
         {t('marketplaceSubtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                category === 'सबै'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
          </svg>
          फिल्टर
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Card Header */}
            <div className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-medium rounded">
                  {product.category}
                </span>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">स्टकमा छैन</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl lg:text-3xl font-bold text-green-600">
                  रू {product.price}
                  <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center text-lg text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
                <span> • {product.seller}</span>
              </div>
              <div className="text-sm text-gray-500">
                {t('Available')} {product.quantity}
              </div>
            </div>
            
            {/* Card Footer */}
            <div className="p-4 pt-0">
              <button 
                className={`w-full px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center ${
                  product.inStock
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'कार्टमा थप्नुहोस्' : 'स्टकमा छैन'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gray-200 rounded-lg">
            <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">{t('Fast Delivery')}</h4>
            <p className="text-sm text-green-600">{t('Quick and reliable delivery to your doorstep')}</p>
          </div>
          <div className="text-center p-6 bg-gray-200 rounded-lg">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">{t('Quality Assured')}</h4>
            <p className="text-sm text-green-600">{t('Verified sellers and quality-checked products')}</p>
          </div>
          <div className="text-center p-6 bg-gray-200 rounded-lg">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">{t('Best Prices')}</h4>
            <p className="text-sm text-green-600">{t('Competitive pricing directly from farmers')}</p>
          </div>
        </div>

      {/* CTA */}
      <div className="text-center">
        <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-opacity flex items-center mx-auto">
          {t('All available products')}
          <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
);
};
export default Marketplace;