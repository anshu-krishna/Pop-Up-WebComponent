# Pop-Up HTML Custom Element
#### What is it?
*\<pop-up\>\</pop-up\>* is a custom HTML element that creates a full-screen popup.

#### *\<pop-up\>* has one (optional) named slot:
- title

	This slot contains the heading of the pop-up.
	```html
	<pop-up show>
		<span slot="title">This is the heading</span>
		This is the content.
	</pop-up>
	```

#### *\<pop-up\>* has two (optional) attributes:
- show

	When *show* attribute is present then, the *pop-up* is visible, else it is hidden.
	```html
	<pop-up show>This pop-up is visible</pop-up>

	<pop-up>This pop-up is hidden</pop-up>
	```
- noeasyclose

	When *noeasyclose* attribute is present then, the *pop-up* does not close when you click outside the message area.
	```html
	<pop-up noeasyclose>If you click outside the message area, this popup will <strong>not</strong> close</pop-up>

	<pop-up>If you click outside the message area, this popup will close</pop-up>
	```

#### *\<pop-up\>* has two methods:
- open()

	This method will make the pop-up visible.
	```html
	<pop-up id="mypopup">hello world</pop-up>
	<script> document.querySelector('#mypopup').open(); </script>
	```
- close()

	This method checks if *popup_element.beforeClose()* is present (and is a function).
	
	If *beforeClose* is present then it is called; if it returns *true* then, the *pop-up* is closed.
	If *beforeClose* is not present then, the *pop-up* is closed.	

	```html
	<pop-up show id="mypopup">hello world</pop-up>
	<script>
		let p = document.querySelector('#mypopup');
		
		p.beforeClose = () => confirm('Do you want to close?');

		p.close();
	</script>
	```
#### *\<pop-up\>* emits two types of events:
- show

	Emitted whenever *popup* goes from hidden to visible.
- hide

	Emitted whenever *popup* goes from visible to hidden.