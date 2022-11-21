const { Data } = require("../core/data.js")
let data = new Data("data/lucky_tracker.json").get();

let state = -1;

function update(event) {
	let message = ChatLib.getChatMessage(event);

		if(!message.startsWith("ENCHANTS » Lucky")) return;

	 	//let lucky_gave = message.replace("ENCHANTS » Lucky activated and gave ", "").replace(".", "");
	 	let lucky_gave = message.match(/ENCHANTS » Lucky activated and gave ([A-z0-9$ ]+)(\.)?/)[1]
	 	data.total_procs++
		switch(lucky_gave) {
			case "3 mine keys":
				data.key_mine += 3;
				state = 0;
				break;
			case "4 token keys":
				data.key_token += 4;
				state = 1;
				break;
			case "2 omega keys":
				data.key_omega += 2;
				state = 2;
				break;
			case "$60Q": 
				data.money++;
				break;
			case "1B tokens":
				data.tokens++;
				break;
			default:
				ChatLib.chat(`§4[LuckyTrackerError] §cUnknown item '${lucky_gave}', report this!`);
				break;
		}
		
	
}

function displayProcs(n) {
	switch(n) {
		case 0:
			return `§b» §f§l${data.key_mine/3} §7Mine Procs`;
		case 1:
			return `§e» §f§l${data.key_token/4} §7Token Procs`;
		case 2:
			return `§c» §f§l${data.key_omega/2} §7Omega Procs`;
		default:
			return "§cError";
	}
}

function updateDisplay() {
	return [
		"    §9§lLucky Tracker    ",
		" ",
		`   §bMine Keys§f: ${data.key_mine}`,
		`   §6Token Keys§f: ${data.key_token}`,
		`   §cOmega Keys§f: ${data.key_omega}`,
		`   §aMoney§f: ${data.money * 60}Q`,
		`   §eTokens§f: ${data.tokens}B`,
		" ",
		 `§e» §f§l${data.total_procs} §r§7Procs`,
		 `${displayProcs(state)}`
	];
}

module.exports = [
	{
		type: "none",
		trigger: "chat",
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