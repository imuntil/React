import React = require('react');

export class UCNameForm extends React.Component<{}, null> {
    public input: HTMLInputElement;
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit (event: {preventDefault (): void}) {
        alert('A name was submitted: ' + this.input.value );
        console.log(event);
        event.preventDefault();
    }
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input defaultValue="zhin" type="text" ref={input => this.input = input}/>
                </label>
                <input type="submit" value="submit"/>
            </form>
        );
    }
}