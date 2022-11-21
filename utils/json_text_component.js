class TextComponentJSON {
	constructor(data) {
		this.data = data;
		this._chain = false;
		this.id = -1;
	}

	parseSingleObj(t) {
		if(typeof t == "string") return new TextComponent(t);

		let com = new TextComponent(t.text);

		if(t.command) com.setClick("run_command", t.command);
		if(t.hover) com.setHoverValue(t.hover);
		if(t.scmd) com.setClick("suggest_command", t.scmd)

		return com;
	}

	chain() {
		this._chain = true;
		return this;
	}

	setID(id) {
		this.id = id;
		return this;
	}

	send() {
		if(!this._chain) {
			return new Message(this.parseSingleObj(this.data))
				.setChatLineId(this.id)
				.chat();
		}
		
		let msg = new Message()
			.setChatLineId(this.id);
	
		let x;
		for(x = 0; x < this.data.length; x++) {
			let v = this.parseSingleObj(this.data[x]);
			msg.addTextComponent(this.data[x + 1] ? v.setText(v.getText() + "\n") : v);
		}

		msg.chat();
	}
}

module.exports = {
	TextComponentJSON
}