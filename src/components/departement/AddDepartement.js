import React, { Component } from 'react'
import Axios from 'axios';

export default class AddDepartement extends Component {

    state = {
        listDep: [],
        nom: '',
        message: null
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveDep = e => {
        e.preventDefault();
        let dep = {
            nom: this.state.nom
        };
        Axios.post("/departements", dep)
        .then(response => {
            this.setState({
                listDep: [...this.state.listDep, response.data.dep]
            })
            this.setState({message : "Departement added successfully"});
            this.props.history.push("/dep");
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="col-md-5">
                <form> 
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" name="nom" className="form-control" placeholder="name"
                        onChange={this.onChange} value={this.state.nom} />
                    </div>
                    <button className="btn btn-success" onClick={this.saveDep}>Save</button>
                </form>

            </div>
        )
    }
}
