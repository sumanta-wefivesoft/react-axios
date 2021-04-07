import React from 'react';
import { isEqual } from 'lodash';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { ...this.props.fieldData },
            isError: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fieldData && !isEqual(nextProps.fieldData, this.props.fieldData)) {
            this.setState({ fields: { ...nextProps.fieldData } })
        }
    }
    handleChange = (event) => {
        let tempFields = { ...this.state.fields }
        tempFields[event.target.name] = event.target.value
        this.setState({ fields: tempFields })
    }
    handleSubmit = () => {
        const { name, email, city } = this.state.fields
        if (!!name && !!email && !!city) {
            this.setState({ isError: false }, () => {
                console.log("Submited")
            })
        } else {
            this.setState({ isError: true })
        }
    }
    setError = (name) => {
        return !this.state.isError ? "black" : !!this.state.fields[name] ? "black" : "red"
    }
    render() {
        const { name, email, city } = this.state.fields
        return <tr style={{ textAlign: "center" }}>
            <td>
                <input type="text" name="name" onChange={this.handleChange} value={name} placeholder="Enter Name" style={{ borderColor: this.setError("name") }} />
            </td>
            <td>
                <input type="text" name="email" onChange={this.handleChange} value={email} placeholder="Enter Email" style={{ borderColor: this.setError("email") }} />
            </td>
            <td>
                <input type="text" name="city" onChange={this.handleChange} value={city} placeholder="Enter City" style={{ borderColor: this.setError("city") }} />
            </td>
            <td>
                <input type="button" value="Save" onClick={this.handleSubmit} />
                <input type="button" value="Close" onClick={this.props.closeForm} />
            </td>
        </tr>
    }
}
export default Form;