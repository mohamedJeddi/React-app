import React, { Component } from 'react';
import axios from 'axios';
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Departement extends Component {

    state = {
        listDepartements: [],
        message: null,
        modal: false,
        modal2: false,
        modal3: false,
        nom: '',
        listEntreprise: [],
        depart: {},
        entreprise: {}
    };

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    toggle2 = () => {
        this.setState(prevState => ({
          modal2: !prevState.modal2
        }));
      }

    toggle3 = () => {
        this.setState(prevState => ({
          modal3: !prevState.modal3
        }));
      }

    onChange = (e) =>
      this.setState({ [e.target.name]: e.target.value });

    handleReset = () => {
        this.setState({
            nom: ''
        })
    }

    componentDidMount() {
        this.getListDep();
    }

    getDepartEntreprise() {
        Axios.get("/departements")
        .then(response => response.data)
        .then(data => {
            this.setState({ listEntreprise: data._embedded.entreprises})
            console.log("Entrep" + this.state.listEntreprise);
        })
        .catch(err => {
            console.log(err);
        })
    }

    getListDep() {
        axios.get("/departements")
        .then(response => response.data)
        .then(data => {
            this.setState({ listDepartements: data._embedded.departements });
            console.log("***********" + this.state.listDepartements);
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteDep = (id) => {
        axios.delete("/departements/" + id)
        .then(this.setState((prevState) => ({
            listDepartements: prevState.listDepartements.filter(dep => id !== dep.id)
        })),
        this.toggle()
        )
        .catch(err => {
            console.log(err);
        });
    }

    saveDep = () => {
        window.localStorage.removeItem("depId");
        let dep = {
            nom: this.state.nom,
        };
        Axios.post("/departements", dep)
        .then(response => {
            this.setState({
                listDepartements: [...this.state.listDepartements, response.data]
            })
            
        },
        this.toggle2(),
        this.getListDep()
        )
        .catch(err => {
            console.log(err)
        });
        this.handleReset();
    }

    getSingleDep = () => {
        Axios.get("/departements/" + window.localStorage.getItem("depId"))
        .then(response => response.data)
        .then(data => {
            this.setState({ depart: data , nom: data.nom});
        })
        .catch(err => {
            console.log(err);
        });
    }

    editDep = (id) => {
        let dep = {
            nom: this.state.nom
        };
        Axios.put("/departements/" + window.localStorage.getItem("depId"), dep)
        .then(response => {
            const index = this.state.listDepartements.findIndex(data => data.id == id);
            this.state.listDepartements[index] = response.data;
            this.setState({
                listDepartements: this.state.listDepartements
            })
        },
        this.toggle3(),
        this.handleReset()
        )
        .catch(err => {
            console.log(err)
        })

    }


    updateDep = id => {
        window.localStorage.setItem("depId", id);
    }


    render() {
        return (
            <div className="col-12">
                <h2 className="text-center">Departement Details</h2>
                <br></br>
                <button className="btn btn-primary float-right" onClick={this.toggle2}>New departement</button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
                <ModalHeader toggle={this.toggle2}>Add Departement</ModalHeader>
                <form>
                <ModalBody>
                   
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" name="nom" className="form-control" placeholder="name"
                        onChange={this.onChange} value={this.state.nom} />
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.saveDep()}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                </ModalFooter>
                </form>
                </Modal>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            {/* <th>Entreprise</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.listDepartements.map((d,c) => (
                        <tr key={c}>
                            
                            <td>{d.nom}</td>
                            {/* <td>{d.entreprise_id}</td> */}
                            <td>
                                <button className="btn btn-danger" onClick={this.toggle} >delete</button>
                                <button className="btn btn-info" onClick= {() => {
                                    this.toggle3();
                                    this.updateDep(d.id);
                                    this.getSingleDep();
                                }}>update</button>
                            </td>

                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Are you sure to delete this departement ?</ModalHeader>
                        <ModalFooter>
                            <form>
                            <Button color="primary" onClick={() => this.deleteDep(d.id)}>delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </form>
                        </ModalFooter>
                        </Modal>


                        <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className}>
                        <ModalHeader toggle={this.toggle3}>Update Departement</ModalHeader>
                        <form>
                        <ModalBody>
                        
                            <div className="form-group">
                                <label htmlFor="nom">Nom</label>
                                <input type="text" name="nom" className="form-control"
                                onChange={this.onChange} value={this.state.nom} />
                            </div>
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.editDep(d.id)}>Update</Button>{' '}
                            <Button color="secondary" onClick={this.toggle3}>Cancel</Button>
                        </ModalFooter>
                        </form>
                        </Modal>

                        </tr>

                    ))}

                    </tbody>
                </table>

            </div>
        )
    }
}

export default Departement;