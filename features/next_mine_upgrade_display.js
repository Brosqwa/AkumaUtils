const Akuma = require("../utils/Akuma.js");
const utils = require("../utils/utils.js");

function update() {
	let nextUpgrade = 22 - (Akuma.getMineLevel() % 22);

	return [
		`§c§lNext Mine Upgrade`,
		`§8[${utils.bar(22, 22 - nextUpgrade, "§a", "§f")}§8] (§a${((1 - nextUpgrade / 22) * 100).toFixed(2)}%§8)`,
		`§a§l${nextUpgrade} §7Levels left §8(${Math.ceil(Akuma.getMineLevel() / 22) * 22})`
	];
}

module.exports = [
	{
		type: "display",
		func: update,
		display: {
			config_key: "next_mine_upgrade_display",
			bg_type: "full"
		}
	}
]