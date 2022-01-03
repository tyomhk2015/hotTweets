💡 `JSX`
<br>Syntax extension to JS.
<br>Allows to directly write HTML in React, or create React element using HTML sytnax.

💡 `BABEL`
<br>Transform JSX elements or codes that can be comprehensible to browsers.
<br>Transcoding recent code to legacy code is possible with the Babel.
<br>E.g) Transcoding ES6+ codes to old style JS code to support IE11.
<br>
<br>After React elements are rendered, the transcoded Babel codes will be in the `head` tag's `script` tag.

💡 `React.useState()`
<br>Returns an array that contains a default value, and a function that modifies specfied data and re-rendering component.
<br>The re-rendering only updates the parts that is different from the previous component's state.
<br>In other words, React re-renders some parts of component when it its necessary.
<br>I find this an efficient way of maintaining browser's performance.
<pre>
  const state = React.useState(0);
  
  // state[0] : Default value, or data to keep track on.
  // state[1] : A function that modifies the data, and re-renders the component.
</pre>

💡 `Components`
<br>A JSX Element, usually returned from functions.

💡 `Props`
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

💡 `Memo`
<br>Short word for 'memorization'. 
<br>A mean of telling React not to re-render the components, which props / states are not changed.
<br>※ If the parent component's state / props changes, the memo'ed children component will be re-rendered.
<pre>
  // Btn components, which props or states are unchanged, will not be re-rendered.
  const MemorizedBtn = React.memo(Btn);
  &#60;MemorizedBtn title={starCraft} onClick={initiate} /&#62;
</pre>

💡 `React.strictMode`
<br>Additional checks for potential problems the react app may have.
<br>https://reactjs.org/docs/strict-mode.html

💡 `Module.css`
<br>For applying CSS to a specific component.
<pre>
// File name
  Component.module.css 

// Importing
  import style from './Component.module.css'
</pre>

💡 `Effect`
<br>For running code on the first rendering only, and not to re-render after that. (For the sake of performance.)
<br>E.g: Calling an external API for the first time to retrieve some data.
<br>If the component is destroyed and created again, this will be invoked.
<br>
<br>Q. When parents re renders, will the effect skip the running the designated code?
<br>A. https://stackoverflow.com/questions/60289924/does-react-hook-component-re-render-when-parent-component-re-renders
<pre>
  Two arguments for useEffect.
  
  1. The function that you want to call only once.
  2. A watcher or data to trigger the function at the 1st argument.
     Runs the function when the 2nd data changes. (Deps)
</pre>

💡 `Lifecycle of rendering`
<pre>
  Render phase lifecycles include the following class component methods:
  
  1. constructor
  2. componentWillMount (or UNSAFE_componentWillMount)
  3. componentWillReceiveProps (or UNSAFE_componentWillReceiveProps)
  4. componentWillUpdate (or UNSAFE_componentWillUpdate)
  5. getDerivedStateFromProps
  6. shouldComponentUpdate
  7. render
  8. setState updater functions (the first argument)
  
  Reference: https://reactjs.org/docs/strict-mode.html
</pre>

💡 `Clean up function`
<br>A function that is invoked when a component is `destroyed`.
<br>`useEffect` function has to return a function when the component is destroyed.
<pre>
  useEffect(() => {
    ...
    return () => console.log("This is destroyed!"); // <<< Clean up part.
  },[]);
</pre>

💡 `Link`
<br>For rendering specific component `without rendering` the browser.
<br>The effect looks like as if the page has been move to the clicked link.

💡 `useParams`
<br>For getting parameters from URL, the parts where the dynamic variables are set on the Router tag.

💡 `gh-pages`
<br>A package for deploying the project and hosting it on the github pages.
<pre>
"scripts": {
  ...
  "deploy": "gh-pages -d build", <<< Pushes the project to the github pages.
  "predeploy": "npm run build",  <<< Runs before the 'deploy' command.
  ...
  }
  ...
  "homepage": "https://tyomhk2015,github.io/gocoin",
  ...
}
</pre>