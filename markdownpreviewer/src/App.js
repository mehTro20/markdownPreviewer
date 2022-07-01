import "./App.css";
import React, { Component } from "react";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: markup,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <div>
        <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>

        <div>
        <h4>Controlled Form:</h4>
        <Previewer markdown={this.state.markdown} />
        </div>
      </div>
         
    );
  }
}

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Previewer = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
      id="preview"
    />
  );
};


const markup = `# Marvel Studios
## Thanos
### Avengers 
The Rest

- Captain America
- Iron Man with [Falcon](https://static.wikia.nocookie.net/vsbattles/images/d/df/Falcon_MC_Classic_TR.gif/revision/latest/scale-to-width-down/450?cb=20190711123729)
- Black Panther 

this is , inline \`<div></div>\`

\`\`\`
const heroes = () =>{
 return "Save The World"
};
\`\`\`

1. **top notch heroes**, available
>Highly abiding!

![Marvel logo](https://iconape.com/wp-content/png_logo_vector/marvel-comics-logo.png)
`;

ReactDOM.render(<App />, document.getElementById('app'));