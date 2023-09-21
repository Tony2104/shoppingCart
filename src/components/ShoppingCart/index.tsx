import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

import { formatCurrency } from "../../utilities/formatCurrency";
import storeItens from "../../data/items.json";
import { useShoppingCart } from "../../context/ShoppingCartContext";

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
							{storeItens.map((item) => (
								<li key={item.id}>
									<div className="flex items-center">
										<img
											src={item.imgUrl}
											alt=""
											className="w-32 h-16 object-cover mr-2"
										/>
										<div>
											<h2>
												{item.name}{" "}
												<span className="text-slate-400 font-sans text-xs">
													x5
												</span>
											</h2>
											<small className="text-slate-400 font-sans text-xs">
												{formatCurrency(item.price)}
											</small>
										</div>
										<div>
											<h2></h2>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
					<h3 className="text-lg justify-self-end pr-4">
						Total {formatCurrency(0)}
					</h3>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
