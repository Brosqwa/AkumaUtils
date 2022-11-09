const features = [
	"rpg_ammo_display",
	"next_mine_upgrade_display",
	"pickaxe_xp_display",
	"lucky_tracker"
];

try {
	require("./core/loader.js")(features);
} catch(err) {
	ChatLib.chat(err);
}

