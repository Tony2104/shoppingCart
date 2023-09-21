import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

import { formatCurrency } from "../../utilities/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItem from "../CartItem";
import storeItens from "../../data/items.json";

function ShoppingCart() {
	const { isOpen, closeCart, cartItems } = useShoppingCart();

	return (
		<div data-open={isOpen}>
			<div className="w-96 bg-black h-full fixed top-0 opacity-30"></div>
			<div className="fixed w-96 h-screen top-0 right-0 text-black bg-white">
				<div className="relative grid grid-rows-none items-stretch gap-y-1.5 px-5 py-3 ">
					<div className="flex justify-between">
						<h3 className="text-xl">Cart</h3>
						<button onClick={closeCart}>
							<FontAwesomeIcon icon={faX} className="icon"></FontAwesomeIcon>
						</button>
					</div>
					<div className="max-h-screen">
						<ul className="flex flex-col gap-2">
							{cartItems.map((item) => (
								<CartItem key={item.id} {...item} />
							))}
						</ul>
					</div>
					<h3 className="text-lg justify-self-end pr-4 font-sans font-semibold">
						Total{" "}
						{formatCurrency(
							cartItems.reduce((total, cartItem) => {
								const item = storeItens.find((item) => item.id === cartItem.id);
								return total + (item?.price || 0) * cartItem.quantity;
							}, 0)
						)}
					</h3>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
