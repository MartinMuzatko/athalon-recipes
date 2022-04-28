import { useHash } from '@mantine/hooks'
import { IndexedDenizenScript } from '../types'
import ItemDisplay from './ItemDisplay'
import Recipe from './Recipe'

export interface ItemCraftingRecipeCardProps extends React.ComponentPropsWithoutRef<'div'> {
	items: IndexedDenizenScript[]
	item: IndexedDenizenScript & { hidden?: boolean }
	children?: JSX.Element
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const ItemCraftingRecipeCard = ({ item, items, children, ...props }: ItemCraftingRecipeCardProps) => {
	const [hash] = useHash()
	return (
		<div className={`p-4 w-1/4 ${props.className}`} id={item.id} onClick={props.onClick}>
			{item.id.replaceAll('_', ' ').split(' ').slice(1).join(' ').split(/(?=[A-Z])/).map(capitalize).join(' ')}
			<div
				className={`${hash.replace('#', '') == item.id ? 'bg-blue-400' : 'bg-gray-300'} p-4 rounded`}
			>
				<ItemDisplay item={item} />
				{item.recipes.map((recipe, id) => (
					<div key={id}>
						Rezept {id + 1}:{recipe.type}
						<Recipe items={items} recipe={recipe} />
					</div>
				))}
				{children}
			</div>
		</div>
	)
}
export default ItemCraftingRecipeCard
