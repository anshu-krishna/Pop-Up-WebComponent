# Pop-Up HTML Custom Element
#### What is it?
`<pop-up></pop-up>` is a custom HTML element that creates a full-screen popup.

#### `<pop-up>` has two (optional) attributes:
- open

	When *open* attribute is present then, the `pop-up` is visible, else it is hidden.
	```html
	<pop-up open>This pop-up is visible</pop-up>

	<pop-up>This pop-up is hidden</pop-up>
	```
- noeasyclose

	When *noeasyclose* attribute is present then, the `pop-up` does not close when you click outside the message area.
	```html
	<pop-up noeasyclose>
		If you click outside the message area, this popup will <strong>not</strong> close
	</pop-up>

	<pop-up>
		If you click outside the message area, this popup will close
	</pop-up>
	```

#### `<pop-up>` has three properties:
- isOpen

	It is `true` when `pop-up` is open and `false` when `pop-up` is closed.\
	Assign `true` or `false` to open or close the `pop-up`.

- beforeOpen

	If is assigned a `function` as it's value then the `function` is called before opening the `pop-up`. If the `function` returns `true` then the `pop-up` is opened else it remains closed.

- beforeClose

	If is assigned a `function` as it's value then the `function` is called before closing the `pop-up`. If the `function` returns `true` then the `pop-up` is closed else it remains open.

#### `<pop-up>` has two methods:
- open()

	This method will open the `pop-up`.
	```html
	<pop-up id="mypopup">hello world</pop-up>
	<script>
		document.querySelector('#mypopup').open();
	</script>
	```
- close()

	This method will close the `pop-up`.

	```html
	<pop-up open id="mypopup">hello world</pop-up>
	<script>
		let p = document.querySelector('#mypopup');
		p.close();
	</script>
	```
#### `<pop-up>` dispatches two types of events:
- show

	Dispatched whenever `pop-up` goes from closed to opened.
- hide

	Dispatched whenever `pop-up` goes from opened to closed.