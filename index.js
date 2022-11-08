try {

const features = [
	"rpgDisplay"
]

require("./core/loader.js")(features);

"test"

} catch(err) {
	ChatLib.chat(err);
}