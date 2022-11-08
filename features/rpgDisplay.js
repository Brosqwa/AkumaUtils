function update() {
	if(Player.getHeldItem() == null) return [""];
	
	let tag = Player.getHeldItem().getNBT().toObject().tag["custom-item-data"];

	if(!tag || !tag.RPG) return [""];

	let col = "§a";
	if(tag.item_remaining_uses / tag.max_item_uses <= 0.7) 
		col = "§e"
	if(tag.item_remaining_uses / tag.max_item_uses <= 0.3) 
		col = "§6"
	if(tag.item_remaining_uses / tag.max_item_uses <= 0.1) 
		col = "§c"

	return [`${col}${tag.item_remaining_uses} §dAmmo`]
}

module.exports = [
	{
		type: "display",
		func: update,
		display: {
			config_key: "rpg_display"
		}
	}
]