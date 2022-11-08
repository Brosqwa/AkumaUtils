function bar(maxval, val, c1 = "§a", c2 = "§f") {
	let ret = "";
	for(var x = 1; x < 21; x++) {
		if(maxval / 20 * x <= val) { ret += c1 + ":"; }
		else { ret += c2 + ":"; }
	}
	return ret;
}

function numberWithCommands(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function avg(arr) {
	let sum = 0;
	for(var x = 0; x < arr.length; x++) sum += arr[x];
	return sum / arr.length;
}

function formatTime(ms) {

	let s = ms / 1000;

	let min = Math.floor(s / 60);
	let h = Math.floor(min / 60);
	let d = Math.floor(h / 24);
	let y = Math.floor(d / 365);

	s -= min * 60;
	min -= h * 60;
	h -= d * 24;
	d -= y * 365

	let r = "";
	if(y > 0) r += `${y}y `
	if(d > 0) r += `${d}d `
	if(h > 0) r += `${h}h `
	if(min > 0) r += `${min}min `
	r += `${s.toFixed(1)}s`

	return r;
}

function getSlotCoords(slot) {
    const x = slot % 9;
    const y = Math.floor(slot / 9);
    const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
    const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - Player.getOpenedInventory().getSize() / 18) * 18);
    return [renderX, renderY];
}

function darkerColor(c) {
	let l = {
		a: "2",
		b: "3",
		c: "4",
		d: "5",
		e: "6",
		f: 7,
		"9": "2",
		"7": "8",
		"6": "c"
	}

	if(l[c]) return "§" + l[c];
	return "§0"; 
}

module.exports = {
	bar: bar,
	avg: avg,
	numberWithCommands: numberWithCommands,
	formatTime: formatTime,
	getSlotCoords: getSlotCoords,
	darkerColor
}