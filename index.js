try {

const features = [
	"rpg_ammo_display"
];

require("./core/loader.js")(features);

} catch(err) {
	ChatLib.chat(err);
}