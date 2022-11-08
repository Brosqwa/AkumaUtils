const utils = require("../utils/utils");

function update() {
	let lore = Player.getInventory().getStackInSlot(0).getNBT().toObject().tag.display.Lore;

	for(var x = 0; x < lore.length; x++) {
		let uncol = ChatLib.removeFormatting(lore[x]);

		var level;
		var xp;

		if(uncol.startsWith("❙ Level: ")) level = parseInt(uncol.replace("❙ Level: ", ""));
		if(uncol.startsWith("❙ XP: ")) xp = parseFloat(uncol.replace(/. XP: .:{20}. .(\d+).(\d+).+/, "$1.$2"));
	}

	return [
		`§4Pickaxe: §8[${utils.bar(100, xp, "§a", "§f")}§8] §8(§a${xp}%§8)`
	]
}

module.exports = [
	{
		type: "display",
		func: update,
		display: {
			config_key: "pickaxe_xp_display"
		}
	}
]