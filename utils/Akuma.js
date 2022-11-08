function getMineLevel() {
	let ret = ChatLib.removeFormatting(Scoreboard.getLineByIndex(12).toString());
	ret = ret.replace(/.+[a-z]+./i, "");
	return parseInt(ret);
}

module.exports = {
	getMineLevel
}