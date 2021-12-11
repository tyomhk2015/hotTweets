* `JSX`
<br>Syntax extension to JS.
<br>Allows to directly write HTML in React, or create React element using HTML sytnax.

* `BABEL`
<br>Transform JSX elements or codes that can be comprehensible to browsers.
<br>Transcoding recent code to legacy code is possible with the Babel.
<br>E.g) Transcoding ES6+ codes to old style JS code to support IE11.
<br>
<br>After React elements are rendered, the transcoded Babel codes will be in the `head` tag's `script` tag.

* `React.useState()`
<br>Returns an array that contains a default value, and a function that modifies specfied data and re-rendering component.
<br>The re-rendering only updates the parts that is different from the previous component's state.
<br>In other words, React re-renders some parts of component when it its necessary.
<br>I find this an efficient way of maintaining browser's performance.
<pre>
  const state = React.useState(0);
  
  // state[0] : Default value, or data to keep track on.
  // state[1] : A function that modifies the data, and re-renders the component.
</pre>

* `Components`
<br>A JSX Element, following the divide-and-conquer pratice.

* `Props`
<br>An object that holds all the additional attributes attached to the custom component.
<br>Instead of using `props` as an argument of functional component, an object, with the property name, can do the same job.
<br>※ To check the type of props, https://www.npmjs.com/package/prop-types
<pre>
  funtion Btn(props){
    return (
      &#60;button&#62;
        {props.nameLabel}
      &#60;/button&#62;
    )
  } 
 
  funtion Btn({nameLabel}){
    return (
      &#60;button&#62;
        {nameLabel}
      &#60;/button&#62;
    )
  }
</pre>

* `Memo`
<br>Short word for 'memorization'. 
<br>A mean of telling React not to re-render the components, which props / states are not changed.
<br>※ If the parent component's state / props changes, the memo'ed children component will be re-rendered.
<pre>
  // Btn components, which props or states are unchanged, will not be re-rendered.
  const MemorizedBtn = React.memo(Btn);
  &#60;MemorizedBtn title={starCraft} onClick={initiate} /&#62;
</pre>

* `React.strictMode`
<br>Additional checks for potential problems the react app may have.
<br>https://reactjs.org/docs/strict-mode.html