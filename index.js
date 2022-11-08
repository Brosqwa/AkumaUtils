try {

const features = [
	"rpgDisplay"
]

require("./core/loader.js")(features);

} catch(err) {
	ChatLib.chat(err);
}