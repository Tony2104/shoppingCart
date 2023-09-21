import StoreItem from "../components/StoreItem";
import storeItens from "../data/items.json";

function Store() {
	return (
		<section className="flex flex-col items-center mb-5">
			<h2 className="text-4xl my-3 md:my-6">Store</h2>
			<ul className="grid md:grid-cols-2 gap-5">
				{storeItens.map((item) => (
					<StoreItem key={item.id} {...item} />
				))}
			</ul>
		</section>
	);
}

export default Store;
