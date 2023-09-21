import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import storeItens from "../../data/items.json";

type CartItemProps = {
	id: number;
	quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
	const { removeFromCart } = useShoppingCart();
	const item = storeItens.find((item) => item.id === id);
	if (item == null) return null;

	return (
		<li key={item.id}>
			<div className="flex items-center border rounded-md overflow-hidden">
				<img src={item.imgUrl} alt="" className="w-32 h-16 object-cover mr-2" />
				<div>
					<h2>
						{item.name}{" "}
						<span className="text-slate-400 font-sans text-xs">
							{"x" + quantity}
						</span>
					</h2>
					<small className="text-slate-400 font-sans text-xs">
						{formatCurrency(item.price)}
					</small>
				</div>
				<div className="flex items-center ml-auto gap-x-2">
					<h2 className="text-sm font-sans font-semibold">
						{formatCurrency(item.price * quantity)}
					</h2>
					<button
						onClick={() => removeFromCart(item.id)}
						className="mr-2 border px-2 py-[0.15rem] rounded"
					>
						<FontAwesomeIcon icon={faX}></FontAwesomeIcon>
					</button>
				</div>
			</div>
		</li>
	);
}

export default CartItem;
