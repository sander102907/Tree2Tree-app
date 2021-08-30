import React from 'react';

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';

// Import a Mode (language)
import 'brace/mode/c_cpp';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/dracula';

export default class Editor extends React.Component {


    render() {
        return (
            <div>
                <AceEditor
                    mode="c_cpp"
                    theme="dracula"
                    onChange={this.props.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true,
                        padding: "20px"
                    }}
                    value={this.props.value}
                    fontSize="16px"
                    width="100%"
                    showGutter={true}
                    showPrintMargin={false}
                    readOnly={this.props.readOnly}
                    highlightActiveLine={false}
                />
            </div>
        );
    }
}