class PopUp extends HTMLElement {
	static get template() {
		if (typeof PopUp._template == "undefined") {
			PopUp._template = document.createElement("template");
			PopUp._template.innerHTML =
				`<style>
:host {
	z-index: 500;

	background: rgba(0, 0, 0, 0.90);
	color: white;
	
	width: 100vw;
	height: 100vh;
	
	position: fixed;
	top: 0;
	left: -101vw;

	display: flex;
	flex-direction: column;
	
	transition: left 0.2s;
}
:host([show]) {
	left: 0;
}
#cntr, #heading_cntr, #content_cntr {
	background: inherit;
	color: inherit;
}
#cntr {
	display: flex;
	flex-direction: column;
	height: 100%;
}
#heading_cntr {
	display: flex;
	justify-content: stretch;
	align-items: center;
}
#title_cntr {
	flex: 1;
	text-align: center;
}
#close_btn {
	padding: 0.5em;
	cursor: pointer;
}
#content_cntr {
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
#content {
	max-height: 100%;
	overflow-y: auto;
}
</style><div id="cntr"><div id="heading_cntr"><div id="title_cntr"><slot name="title"></slot></div><span id="close_btn" title="Close PopUp">&#128473;</span></div><div id="content_cntr"><div id="content"><slot></slot></div></div></div>`;
		}
		return PopUp._template;
	}
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(PopUp.template.content.cloneNode(true));
		this.__escHandler = (function (event) {
			if (event.keyCode == 27) {
				this.close();
			}
		}).bind(this);
		this.shadowRoot.querySelector('#close_btn').addEventListener('click', () => {
			this.close();
		});
		this.__internalElements = {
			contentContainer: this.shadowRoot.querySelector('#content_cntr'),
			content: this.shadowRoot.querySelector('#content'),
		};
		this.__internalElements.contentContainer.onclick = e => this.close();
		this.__internalElements.content.onclick = e => e.stopPropagation();
	}
	// connectedCallback() { }
	disconnectedCallback() {
		document.body.style.overflowY = null;
		window.removeEventListener('keyup', this.__escHandler);
	}
	close() {
		if (!this.show) return;
		let allow = true;
		if (typeof this.beforeClose == "function") {
			allow = !!this.beforeClose(this);
		}
		if (allow) {
			this.show = false;
		}
	}
	open() {
		this.show = true;
	}
	// adoptedCallback() {}
	get show() {
		return this.hasAttribute("show");
	}
	set show(val) {
		if (val) {
			this.setAttribute("show", '');
		} else {
			this.removeAttribute("show");
		}

	}
	static get observedAttributes() {
		return ['show', 'noeasyclose'];
	}
	attributeChangedCallback(name, oldval, newval) {
		// console.log("Changed", name, ":", oldval, "->", newval);
		switch (name) {
			case 'show':
				if (newval === null) {
					document.body.style.overflowY = null;
					window.removeEventListener('keyup', this.__escHandler);
					this.dispatchEvent(new Event('hide'));
				} else {
					document.body.style.overflowY = 'hidden';
					window.addEventListener('keyup', this.__escHandler);
					this.dispatchEvent(new Event('show'));
				}
				break;
			case 'noeasyclose':
				if (newval === null) {
					this.__internalElements.contentContainer.onclick = e => this.close();
					this.__internalElements.content.onclick = e => e.stopPropagation();
				} else {
					this.__internalElements.contentContainer.onclick = null;
					this.__internalElements.content.onclick = null;
				}
				break;
		}
	}
}
customElements.define("pop-up", PopUp);