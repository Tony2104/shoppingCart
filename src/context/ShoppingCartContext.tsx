import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type CartItem = {
	id: number;
	quantity: number;
};

type ShoppingCartContext = {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	cartQuantity: number;
	cartItems: CartItem[];
	isOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [isOpen, setIsOpen] = useState(() => false);
	const [cartItems, setcartItems] = useLocalStorage<CartItem[]>(
		() => "shopping-cart",
		[]
	);

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);
	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	function getItemQuantity(id: number) {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}
	function increaseCartQuantity(id: number) {
		setcartItems((currentItem) => {
			if (currentItem.find((item) => item.id === id) == null) {
				return [...currentItem, { id, quantity: 1 }];
			} else {
				return currentItem.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}
	function decreaseCartQuantity(id: number) {
		setcartItems((currentItem) => {
			if (currentItem.find((item) => item.id === id)?.quantity === 1) {
				return currentItem.filter((item) => item.id !== id);
			} else {
				return currentItem.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}
	function removeFromCart(id: number) {
		return setcartItems((currentItem) => {
			return currentItem.filter((item) => item.id !== id);
		});
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				openCart,
				closeCart,
				cartItems,
				cartQuantity,
				isOpen,
			}}
		>
			{children}
			<ShoppingCart />
		</ShoppingCartContext.Provider>
	);
}
