const detection = /You have ([0-9,]+) keys for this crate./;
const scale = 0.85;
const { Data } = require("../core/data.js");
const config = new Data("data/config.json");

function render(item, _x, _y) {
	//if(slot.getInventory().getName() != "Keys") return;
	if(!config.get().key_amount_display.enabled) return;

	try { item.getNBT() } catch(err) { return; }

	let nbt = item.getNBT().toObject();
	if(nbt.tag.display) {
		let lore = nbt.tag.display.Lore;
		lore.forEach(ln => {
			let line = ChatLib.removeFormatting(ln);

			let mat = line.match(detection);
			if(mat) {
				let xoff = Renderer.getStringWidth(mat[1]) / 2 * 0.9;
				let xoff2 = 7.5 / scale;

				let x = _x / scale;
				let y = _y / scale;

				let col = mat[1] == "0" ? "7" : nbt.tag.display.Name[1];

				Renderer.translate(0, 0, 300);
				Renderer.scale(scale, scale);
				Renderer.drawString("§" + col + mat[1], x + xoff2 - xoff, y + 3);
			}
		})
	}

}

module.exports = [
	{
		trigger: "renderItemIntoGui",
		type: "none",
		func: render
	}
]