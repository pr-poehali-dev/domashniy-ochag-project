import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Уютное кресло "Комфорт"',
      price: 45900,
      category: 'furniture',
      image: '/img/99b15021-dace-43c6-a9c0-4a88de030462.jpg',
      rating: 4.8,
      reviews: 127,
      description: 'Мягкое кресло с эргономичной спинкой для максимального комфорта'
    },
    {
      id: 2,
      name: 'Садовый набор "Релакс"',
      price: 89900,
      category: 'outdoor',
      image: '/img/f875343e-7bcc-432d-809b-121f2bcabaa0.jpg',
      rating: 4.6,
      reviews: 84,
      description: 'Стильная мебель для отдыха на открытом воздухе'
    },
    {
      id: 3,
      name: 'Набор для кухни "Домашний"',
      price: 15900,
      category: 'accessories',
      image: '/img/b0f20acc-c7d6-4f6c-a088-357d1c807c80.jpg',
      rating: 4.9,
      reviews: 203,
      description: 'Современные аксессуары для уютной кухни'
    },
    {
      id: 4,
      name: 'Плед "Тепло дома"',
      price: 3900,
      category: 'accessories',
      image: '/img/99b15021-dace-43c6-a9c0-4a88de030462.jpg',
      rating: 4.7,
      reviews: 156,
      description: 'Мягкий плед из натуральных материалов'
    },
    {
      id: 5,
      name: 'Диван "Семейный очаг"',
      price: 67900,
      category: 'furniture',
      image: '/img/99b15021-dace-43c6-a9c0-4a88de030462.jpg',
      rating: 4.8,
      reviews: 92,
      description: 'Просторный диван для всей семьи'
    },
    {
      id: 6,
      name: 'Гриль "Барбекю мастер"',
      price: 34900,
      category: 'outdoor',
      image: '/img/f875343e-7bcc-432d-809b-121f2bcabaa0.jpg',
      rating: 4.5,
      reviews: 67,
      description: 'Профессиональный гриль для дачи и пикников'
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      productId: 1,
      author: 'Анна К.',
      rating: 5,
      comment: 'Кресло просто замечательное! Очень удобное и красивое.',
      date: '2024-01-15'
    },
    {
      id: 2,
      productId: 1,
      author: 'Михаил П.',
      rating: 5,
      comment: 'Отличное качество материалов, сидеть очень комфортно.',
      date: '2024-01-20'
    },
    {
      id: 3,
      productId: 2,
      author: 'Елена В.',
      rating: 4,
      comment: 'Красивый набор, подошел идеально для нашей террасы.',
      date: '2024-01-18'
    },
    {
      id: 4,
      productId: 3,
      author: 'Дмитрий С.',
      rating: 5,
      comment: 'Качественные аксессуары, рекомендую!',
      date: '2024-01-22'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Home' },
    { id: 'furniture', name: 'Мебель', icon: 'Armchair' },
    { id: 'outdoor', name: 'Для отдыха', icon: 'TreePine' },
    { id: 'accessories', name: 'Аксессуары', icon: 'Package' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter(review => review.productId === productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Home" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-gray-900">Домашний очаг</h1>
                <p className="text-sm text-muted-foreground">Товары для дома и отдыха</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">О нас</a>
              <a href="#catalog" className="text-gray-700 hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Доставка</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-orange-100 animate-fade-in">
              <nav className="flex flex-col space-y-4 pt-4">
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-primary transition-colors px-2 py-1 rounded hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Главная
                </a>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-primary transition-colors px-2 py-1 rounded hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  О нас
                </a>
                <a 
                  href="#catalog" 
                  className="text-gray-700 hover:text-primary transition-colors px-2 py-1 rounded hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Каталог
                </a>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-primary transition-colors px-2 py-1 rounded hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Доставка
                </a>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-primary transition-colors px-2 py-1 rounded hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Контакты
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Создайте уютный дом своей мечты
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Откройте для себя коллекцию качественных товаров для дома и отдыха. 
                Мы поможем создать атмосферу тепла и комфорта в каждом уголке вашего дома.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Перейти к покупкам
                </Button>
                <Button variant="outline" size="lg">
                  <Icon name="PlayCircle" size={20} className="mr-2" />
                  Смотреть видео
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src="/img/99b15021-dace-43c6-a9c0-4a88de030462.jpg"
                alt="Уютный интерьер"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Категории товаров
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2 text-sm md:text-base"
              >
                <Icon name={category.icon as any} size={18} />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const productReviews = getProductReviews(product.id);
              return (
                <Card key={product.id} className="group hover:shadow-xl transition-shadow duration-300 animate-fade-in">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-900 shadow-md">
                        <Icon name="Star" size={14} className="mr-1 text-yellow-400 fill-current" />
                        {product.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} отзывов)
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading text-2xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>

                    {/* Product Reviews Preview */}
                    {productReviews.length > 0 && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Последние отзывы:</h4>
                        <div className="space-y-2">
                          {productReviews.slice(0, 2).map((review) => (
                            <div key={review.id} className="text-sm">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium">{review.author}</span>
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="text-gray-600 text-xs">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-8 bg-white border-t">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center">
                  <Icon name="ShoppingCart" size={24} className="mr-2" />
                  Корзина ({cartItemsCount} товаров)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="font-heading text-2xl font-bold">
                      Итого: {cartTotal.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Оформить заказ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Home" size={20} className="text-white" />
                </div>
                <span className="font-heading text-xl font-bold">Домашний очаг</span>
              </div>
              <p className="text-gray-400 text-sm">
                Создаем уютный дом вашей мечты с качественными товарами для дома и отдыха.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Мебель</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Для отдыха</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Аксессуары</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Новинки</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@domocag.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Домашняя, 1</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Домашний очаг. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;