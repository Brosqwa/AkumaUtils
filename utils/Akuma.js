function getMineLevel() {
	let ret = ChatLib.removeFormatting(Scoreboard.getLineByIndex(11).toString());
	ret = ret.replace(/.+[a-z]+./i, "");
	return parseInt(ret);
}

module.exports = {
	getMineLevel
}