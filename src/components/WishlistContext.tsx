import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { Product } from '../type';

interface WishlistContextType{
    wishlistItems : Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean; 
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {

  const [wishlistItems, setWishlistItems] = useState<Product[]>(()=>{
    try{
        const savedItems = localStorage.getItem('wishlist');
        return savedItems ? JSON.parse(savedItems) : [];
    }catch(err){
        console.error("Failed to get wishlist",err);
        return[];
    }
  });

  useEffect(()=>{
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  },[wishlistItems]);

  const addToWishlist = (product: Product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;