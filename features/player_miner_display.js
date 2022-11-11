const { Data } = require("../core/data.js")
let data = new Data("data/player_miner_display.json").get();

const utils = require("../utils/utils.js");

//let frames = "⚋⚊⚏⚍⚎⚌☷☶☳☵☴☲☱☰☱☲☴☵☳☶☷⚌⚎⚍⚏⚊⚋";
//let frames = "▄▟▐▜▀▛▌▙";
//let frames = "▛▜▙▟"
let frames = "▙▟▜▛"

let frame = -1;
let fcd = 20;
let last_f = frames[0];

function update(event) {
	let message = ChatLib.getChatMessage(event);

	if(message.startsWith("MINERS » ")) {
		let rmsg = message.replace("MINERS » ", "");
		ChatLib.chat("|" + rmsg + "|");
		switch(rmsg) {
			case "You spawned your Player Miner!":
				data.active = true;
				data.start_time = Date.now();
				data.stop_time = 0;
				break;
			case "Your miner ran out of battery and was despawned.":
			case "You despawned your Player Miner!":
				data.active = false;
				data.stop_time = Date.now() - data.start_time;
				data.start_time	= 0;
				Client.showTitle("§cMiner Despawned", `§7${utils.formatTime(data.stop_time)}`, 0, 30, 0);
				last_f = frames[frame];
				break;
			case "Your player miner is not fully charged":
				ChatLib.chat("carged");
				break;
			default:
				ChatLib.chat("nothing?");
				break;
		}
	}
}

function updateDisplay() {
	fcd++;
	if(fcd >= 5) {
		if(frame >= frames.length - 1)
			frame = -1
		frame++;
		fcd = 0;
	}
	let ret = [];
	if(data.active) {
		ret = [
			"§a§lPlayer Miner",
			"    §2(Mining)",
			`§3${frames[frame]} §b${utils.formatTime(Date.now() - data.start_time)}`
		];
	} else { 
		ret = [
			"§c§lPlayer Miner",
			"  §4(Charging)",
			`§7${last_f} §f${utils.formatTime(data.stop_time)}`
		];
		//ret.push(utils.centerText(`${utils.formatTime(data.stop_time)}`, ret));
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
			config_key: "player_miner_display",
			bg_type: "full"
		}
	}
]