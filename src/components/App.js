import React from 'react';
import Form from './formComponent';
import api from '../api';
class App extends React.Component {
    initialFields = {
        name: "",
        email: "",
        city: ""
    }
    constructor(props) {
        super(props);
        this.state = {
            fields: { ...this.initialFields },
            resultList: [],
            openFormType: "CLOSE"
        }
    }
    retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    };
    getAllCOntacts = async () => {
        const allContacts = await this.retrieveContacts();
        if (!!allContacts)
            this.setState({ resultList: allContacts });
    };
    componentDidMount() {
        this.getAllCOntacts();
    }
    closeForm = () => {
        this.setState({ openFormType: "CLOSE", fields: { ...this.initialFields } })
    }
    render() {
        return <div style={{ width: "600px", margin: 'auto' }}>
            <div>
                <h3 style={{ width: "300px", float: "left" }}>Contact List</h3>
                <input onClick={() => this.setState({ openFormType: "ADD" })} style={{ float: "right", marginTop: "20px" }} type="button" value="Add New Record" />
            </div>
            <table border="1" align="center" style={{ width: "600px" }}>
                <thead>
                    {this.state.openFormType === "ADD" &&
                        <Form
                            fieldData={this.state.fields}
                            closeForm={this.closeForm}
                        />
                    }
                    <tr>
                        <th style={{ width: "150px" }}>Full Name</th>
                        <th style={{ width: "150px" }}>Email</th>
                        <th style={{ width: "150px" }}>City</th>
                        <th style={{ width: "150px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.resultList.map(data => {
                        return <tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.city}</td>
                            <td style={{ textAlign: "center" }}>
                                <input type="button" value="Edit" />
                                <input type="button" value="Delete" />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
}
export default App;