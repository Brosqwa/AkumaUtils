try {

const feature_list = [
	"rpg_ammo_display",
	"next_mine_upgrade_display",
	"pickaxe_xp_display",
	"lucky_tracker",
	"player_miner_display",
	"key_amount_display",
	"pets_display"
];


require("./core/loader.js")(feature_list);

} catch(err) {
	ChatLib.chat(err);
}

register("command", () => {
	let nbt = Player.getHeldItem().getNBT().toObject().tag;

	ChatLib.chat(JSON.stringify(nbt, true, 4));

}).setName("getnbt")

register("command", (...args) => {
	try {
		require("./command.js").cmd(args);
	} catch(err) {
		ChatLib.chat(err);
	}
}).setName("akumautils")

register("command", (...args) => {
	try {
		require("./command.js").cc(args);
	} catch(err) {
		ChatLib.chat(err);
	}
}).setName("akumautilsconfig")


ChatLib.chat("§4§lAkuma§f§lUtils §7- §fAkumaUtils has been loaded");
ChatLib.chat("§fUse §b/akumautils §fto configure");