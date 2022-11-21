const utils = require("../utils/utils.js");

const rarity = {
	COMMON: "§f[C]",
	RARE: "§9[R]",
	LEGENDARY: "§5[L]",
	MYTHICAL: "§3[M]"
}

function display() {

	let amount = 0;
	let ret = [" "];
	let items = Player.getInventory().getItems();
	for(let x = 0; x < items.length; x++) {
		if(!items[x]) continue;
		
		let item = items[x];
		let nbt = item.getNBT().toObject();
		if(!nbt.tag["custom-item-data"]) continue;
		if(!nbt.tag["custom-item-data"]["pet-tier"]) continue;
		amount++;

		let petname = nbt.tag.display.Name;
		let reg = ChatLib.removeFormatting(petname).match(/([A-z ]+) PET \((active|inactive|recharging)\)/);

		// color
		let col = utils.lighterColor(petname[1], null) || "§" + petname[1];
		let is_active = reg[2] == "active";
		let active_extra = "";
		let active_icon = "§c⬜";

		if(is_active) {
			active_extra = "§l";
			active_icon = "§a⬛";
		}

		// name
		let name = ChatLib.removeFormatting(reg[1]);
		let colored_name = col + active_extra + name + "§r";

		let data = nbt.tag["custom-item-data"];

		let charged_in = -1;
		if(data["pet-battery-chargedtime"] != -1)
			charged_in = data["pet-battery-chargedtime"] - Date.now();

		let p = 100 - data["pet-battery-usedcount"] / data["pet-battery-durability"] * 100;
		let pcol = "a";
		if(p < 50)
			pcol = "e";
		if(p < 25)
			pcol = "6";
		if(p < 10)
			pcol = "c";

		if(charged_in != -1)
			ret.push(` §e§l⚡ ${rarity[data["pet-tier"]]} ${colored_name} §e[${utils.formatTime(charged_in, 0)}]`);
		else
			ret.push(`${active_icon} ${rarity[data["pet-tier"]]} ${colored_name} §${pcol}(${p.toFixed(1)}%)`); 
	}

	if(!amount) return [];
	ret.push(" ");
	return ret;
}

module.exports = [
	{
		type: "display",
		func: display,
		display: {
			bg_type: "full"
		}
	}
]