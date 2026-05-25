import { useState, useEffect } from 'react';
import Sidebar, { AllViewTypes } from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ProductsView from './components/ProductsView';
import CategoriesView from './components/CategoriesView';
import StockView from './components/StockView';
import SalesView from './components/SalesView';
import CustomersView from './components/CustomersView';
import ReportsView from './components/ReportsView';
import AcademicViews from './components/AcademicViews';
import ConfigView from './components/ConfigView';

import { Product, Category, Customer, Sale, StockTransaction, SystemSettings } from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_CUSTOMERS, 
  INITIAL_SALES, 
  INITIAL_TRANSACTIONS, 
  DEFAULT_SETTINGS 
} from './data/initialData';

// Local storage key names for full persistent experience
const STORAGE_KEYS = {
  PRODUCTS: 'tienda_raul_products',
  CATEGORIES: 'tienda_raul_categories',
  CUSTOMERS: 'tienda_raul_customers',
  SALES: 'tienda_raul_sales',
  TRANSACTIONS: 'tienda_raul_transactions',
  SETTINGS: 'tienda_raul_settings'
};

export default function App() {
  // Current view of dashboard or academic chapters
  const [currentView, setCurrentView] = useState<AllViewTypes>('historia');

  // Load from local storage or set defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SALES);
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [transactions, setTransactions] = useState<StockTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Persist states automatically on modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Product actions handlers
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);

    // Record initial stock input in bitácora
    if (newProduct.stock > 0) {
      handleAddStockTransaction(
        newProduct.id,
        newProduct.name,
        'ENTRADA',
        newProduct.stock,
        'Registro inicial del producto',
        'Sistema Automatizado'
      );
    }
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Category actions handlers
  const handleAddCategory = (newCatData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...newCatData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
  };

  const handleUpdateCategory = (updated: Category) => {
    setCategories(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Helper directly inputs stock transaction without altering state multiple times
  const handleAddStockTransaction = (
    prodId: string, 
    prodName: string, 
    txType: 'ENTRADA' | 'SALIDA' | 'AJUSTE', 
    txQuantity: number, 
    txReason: string, 
    txUser: string
  ) => {
    const newTx: StockTransaction = {
      id: `st-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      date: new Date().toISOString(),
      productId: prodId,
      productName: prodName,
      type: txType,
      quantity: txQuantity,
      reason: txReason,
      user: txUser
    };

    setTransactions(prev => [newTx, ...prev]);

    // Apply multiplier to products array
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === prodId) {
        let nextStock = p.stock;
        if (txType === 'ENTRADA') {
          nextStock += txQuantity;
        } else if (txType === 'SALIDA') {
          nextStock = Math.max(0, p.stock - txQuantity);
        } else if (txType === 'AJUSTE') {
          // Adjust can be both positive or negative
          nextStock = Math.max(0, p.stock + txQuantity);
        }
        return { ...p, stock: nextStock };
      }
      return p;
    }));
  };

  // Quick understock replenishment button from Dashboard
  const handleQuickRestockProduct = (productId: string, amount: number) => {
    const matched = products.find(p => p.id === productId);
    if (!matched) return;

    handleAddStockTransaction(
      productId,
      matched.name,
      'ENTRADA',
      amount,
      'Reabastecimiento express desde dashboard principal',
      'Administrador Raúl'
    );
  };

  // Advanced checkout handler (Links Sales + Stock Logs + Customer Spending)
  const handleAddSale = (newSaleData: Omit<Sale, 'id' | 'date'>): Sale => {
    const nextCodeIndex = sales.length + 1;
    const saleId = `TR-VE-${String(nextCodeIndex).padStart(3, '0')}`;
    const currentDateStr = new Date().toISOString();

    const newSale: Sale = {
      ...newSaleData,
      id: saleId,
      date: currentDateStr
    };

    // 1. Save sale
    setSales(prev => [newSale, ...prev]);

    // 2. Map and deduct products stock & add transaction logging in bitácora
    newSale.items.forEach(item => {
      handleAddStockTransaction(
        item.productId,
        item.name,
        'SALIDA',
        item.quantity,
        `Venta POS procesada (${saleId})`,
        'Cajero Central'
      );
    });

    // 3. Update customer total compras if loaded
    if (newSale.customerId) {
      setCustomers(prevCusts => prevCusts.map(c => {
        if (c.id === newSale.customerId) {
          return {
            ...c,
            totalPurchases: c.totalPurchases + newSale.total
          };
        }
        return c;
      }));
    }

    return newSale;
  };

  // Customer additions
  const handleAddCustomer = (newCustData: Omit<Customer, 'id' | 'totalPurchases'>) => {
    const newCust: Customer = {
      ...newCustData,
      id: `cust-${Date.now()}`,
      totalPurchases: 0
    };
    setCustomers(prev => [...prev, newCust]);
  };

  // Clear system to defaults
  const handleResetDatabase = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.SALES);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);

    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCustomers(INITIAL_CUSTOMERS);
    setSales(INITIAL_SALES);
    setTransactions(INITIAL_TRANSACTIONS);
    setSettings(DEFAULT_SETTINGS);
    setCurrentView('historia');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col lg:flex-row text-stone-800 antialiased font-sans">
      
      {/* Lateral Menu bar Drawer */}
      <Sidebar 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        products={products}
        storeName={settings.storeName}
      />

      {/* Main dashboard viewport */}
      <main className="flex-1 min-h-screen p-4 sm:p-6 lg:p-8 overflow-x-hidden pt-20 lg:pt-8 bg-[#FAF8F5]">
        
        {/* Core dynamic route component view selection */}
        {currentView === 'dashboard' && (
          <DashboardView 
            products={products}
            sales={sales}
            customers={customers}
            categories={categories}
            currency={settings.currency}
            onNavigate={(view) => setCurrentView(view)}
            onRestockProduct={handleQuickRestockProduct}
          />
        )}

        {currentView === 'ventas' && (
          <SalesView 
            products={products}
            categories={categories}
            customers={customers}
            onAddSale={handleAddSale}
            currency={settings.currency}
          />
        )}

        {currentView === 'productos' && (
          <ProductsView 
            products={products}
            categories={categories}
            currency={settings.currency}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {currentView === 'categorias' && (
          <CategoriesView 
            categories={categories}
            products={products}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {currentView === 'stock' && (
          <StockView 
            products={products}
            transactions={transactions}
            onAddTransaction={(tx) => handleAddStockTransaction(tx.productId, tx.productName, tx.type, tx.quantity, tx.reason, tx.user)}
            currency={settings.currency}
          />
        )}

        {currentView === 'clientes' && (
          <CustomersView 
            customers={customers}
            currency={settings.currency}
            onAddCustomer={handleAddCustomer}
          />
        )}

        {currentView === 'reportes' && (
          <ReportsView 
            products={products}
            sales={sales}
            categories={categories}
            currency={settings.currency}
          />
        )}

        {currentView === 'configuracion' && (
          <ConfigView 
            settings={settings}
            onUpdateSettings={(updated) => setSettings(updated)}
            onResetDatabase={handleResetDatabase}
          />
        )}

        {/* Dynamic educational tabs wrapper */}
        {['historia', 'marco', 'estructurado', 'objetos', 'videos', 'contacto'].includes(currentView) && (
          <AcademicViews currentTab={currentView as any} />
        )}

      </main>

    </div>
  );
}
