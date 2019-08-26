import React, { Component } from 'react'
import Axios from 'axios';

export default class UpdateDepartement extends Component {

    state = {
        listDep: [],
        dep: {},
        nom: ''
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    componentDidMount() {
            this.getListDep();
        }
    
    getListDep = () => {
            Axios.get("/departements/" + window.localStorage.getItem("depId"))
            .then(response => response.data)
            .then(data => {
                this.setState({ dep: data , nom: data.nom});
                console.log("***********" + this.state.dep.nom);
                console.log("RESPONSE" + data);
            })
            .catch(err => {
                console.log(err);
            });
        }

    editDep = e => {
        e.preventDefault();
        let dep = {
            nom: this.state.nom
        };
        Axios.put("/departements/" + window.localStorage.getItem("depId"), dep)
        .then(response => {
            this.setState({
                listDep: [...this.state.listDep, response.data.dep]
            })
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
                    <button className="btn btn-success" onClick={this.editDep}>Save</button>
                </form>
            </div>
        )
    }
}
