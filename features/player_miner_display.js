const { Data } = require("../core/data.js")
let data = new Data("data/player_miner_display.json").get();

const utils = require("../utils/utils.js");

function update(event) {
	let message = ChatLib.getChatMessage(event);

	if(message.startsWith("MINERS » ")) {
		let rmsg = message.replace("MINERS » ", "");
		switch(rmsg) {
			case "You spawned your Player Miner!":
				data.active = true;
				data.start_time = Date.now();
				data.stop_time = 0;
				data.full_charge = false;
				break;
			case "Your miner ran out of battery and was despawned.":
			case "You despawned your Player Miner!":
				data.active = false;
				data.stop_time = Date.now() - data.start_time;
				data.start_time	= 0;
				Client.showTitle("§cMiner Despawned", `§7${utils.formatTime(data.stop_time, 2)}`, 0, 30, 0);
				break;
			case "Your player miner is now fully charged":
				Client.showTitle(" ", "§aMiner Charged", 0, 30, 0);
				data.full_charge = true;
				break;
		}
	}
}

function updateDisplay() {
	let ret = [];
	if(data.active) {
		ret = [
			"§a§lPlayer Miner",
			"    §2(Mining)",
			`§3⌛ §b${utils.formatTime(Date.now() - data.start_time, 0)}`
		];
	} else {
		if(!data.full_charge)
			ret = [
				"§c§lPlayer Miner",
				"  §4(Charging)",
				`§4§m⌛§r §f${utils.formatTime(data.stop_time, 2)}`
			];
		else
			ret = [
				"§e§lPlayer Miner",
				"  §6(Charged)",
				`§6⌛ §f${utils.formatTime(data.stop_time, 2)}`
			];
	}
	return ret;
}

module.exports = [
	{
		trigger: "chat",
		type: "none",
		func: update
	},
	{
		type: "display",
		func: updateDisplay,
		display: {
			bg_type: "full"
		}
	}
]