// Font Aweome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { formatCurrency } from "../../utilities/formatCurrency";

type StoreItemProp = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

function StoreItem({ id, name, price, imgUrl }: StoreItemProp) {
	let quantity = 1;

	return (
		<li key={id} className="bg-[#243B48] border-2 border-slate-100 rounded-md">
			<img
				src={imgUrl}
				alt={name}
				className="object-cover w-80 h-80 md:w-96 md:h-96 rounded-t-md"
			/>
			<div className="grid grid-cols-2 gap-3 py-5 items-center mx-3">
				<cite className="text-2xl">{name}</cite>
				<h3 className="text-xl justify-self-end">{formatCurrency(price)}</h3>
				<div className="col-span-2">
					{quantity === 0 ? (
						<button className="bg-teal-300 w-full rounded">
							+ Add to Cart
						</button>
					) : (
						<div className="flex flex-col items-center">
							<div className="flex gap-3 justify-center mb-2">
								<button className="bg-emerald-400 px-1 rounded">
									<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
								</button>
								<p>{0} in Cart</p>
								<button className="bg-emerald-400 px-1 rounded">
									<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
								</button>
							</div>
							<button className="bg-red-600 px-2 rounded">Remove</button>
						</div>
					)}
				</div>
			</div>
		</li>
	);
}

export default StoreItem;
