import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Entreprise extends Component {

    state = {
        listEntreprise: [],
        modal: false,
        modal2: false,
        modal3: false,
        nom: '',
        adresse: '',
        listDepart: [],
        entrep:{},
        departement: [{}]
    }

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
        this.getListEntrep();
        this.getListDep();
    }

    getListEntrep() {
        Axios.get("/entreprise/all")
        .then(response => response.data)
        .then(data => {
            this.setState({
                listEntreprise: data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    getListDep() {
        Axios.get("/departements")
        .then(response => response.data)
        .then(data => {
            this.setState({
                listDepart: data._embedded.departements
            })
            console.log("*/*/*****" + this.state.listDepart);
        })
        .catch(err => {
            console.log(err)
        })
    }

    deleteEntrep = (id) => {
        Axios.delete("/entreprises/" + id)
        .then(this.setState((prevState) => ({
            listEntreprise: prevState.listEntreprise.filter(e => id !== e.id)
        })),
        this.toggle()
        )
        .catch(err => {
            console.log(err);
        });
    }

    saveEntrep = () => {
        window.localStorage.removeItem("entrepId");
        let entreprise = {
            nom: this.state.nom,
            adresse: this.state.adresse,
            departement: this.state.departement
        };
        const myObj = JSON.stringify(entreprise);
        console.log(myObj);
        console.log("JSON" + JSON.parse(myObj));
        Axios.post("/entreprise/add", entreprise)
        .then(response => {
            this.setState({
                listEntreprise: [...this.state.listEntreprise, response.data],
                departement: [...this.state.departement, response.data.departement]
            })
            console.log("*******" + response.data);
            console.log("-----------" + this.state.departement);

        },
        this.toggle2(),
        this.getListEntrep()
        )
        .catch(err => {
            console.log(err)
        });
        this.handleReset();
    }

    getSingleEntrep = () => {
        Axios.get("/entreprises/" + window.localStorage.getItem("entrepId"))
        .then(response => response.data)
        .then(data => {
            this.setState({ entrep: data , nom: data.nom, adresse: data.adresse});
        })
        .catch(err => {
            console.log(err);
        });
    }

    editEntrep = (id) => {
        let dep = {
            nom: this.state.nom
        };
        Axios.put("/entreprises/" + window.localStorage.getItem("entrepId"), dep)
        .then(response => {
            // eslint-disable-next-line
            const index = this.state.listEntreprise.findIndex(data => data.id == id);
            this.state.listEntreprise[index] = response.data;
            this.setState({
                listEntreprise: this.state.listEntreprise
            })
        },
        this.toggle3()
        )
        .catch(err => {
            console.log(err)
        })

    }
    // eslint-disable-next-line
    updateEntrep = id => {
        window.localStorage.setItem("entrepId", id);
    }




    render() {
        return (
            <div className="col-12">
                <h2 className="text-center">Entreprise Details</h2>
                <br></br>
                <button className="btn btn-primary float-right" onClick={this.toggle2}>New entreprise</button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
                <ModalHeader toggle={this.toggle2}>Add Entreprise</ModalHeader>
                <form>
                <ModalBody>
                   
                    <div className="form-group">
                        <label htmlFor="nom">Name</label>
                        <input type="text" name="nom" className="form-control" placeholder="Name"
                        onChange={this.onChange} value={this.state.nom} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nom">Adress</label>
                        <input type="text" name="adresse" className="form-control" placeholder="Adress"
                        onChange={this.onChange} value={this.state.adresse} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nom">Departement</label>
                        <input type="text" name="departement" className="form-control" placeholder="Departement"
                        onChange={this.onChange} value={this.state.departement} />
                    </div>


                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.saveEntrep()}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                </ModalFooter>
                </form>
                </Modal>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Adress</th>
                            <th>Departements</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listEntreprise && this.state.listEntreprise.map((e,c) => (
                            <tr key={c}>
                                <td>{e.nom}</td>
                                <td>{e.adresse}</td>

                                {e.departements && e.departements.map((d,k) => (
                                    <td key={k}>{d.nom}</td>
                                ))}
                                
                                <td>
                                    <button className="btn btn-danger" onClick={this.toggle}>delete</button>
                                    <button className="btn btn-info" onClick= {() => {
                                    this.toggle3();
                                    this.updateEntrep(e.id);
                                    this.getSingleEntrep();
                                }}>update</button>
                                </td>

                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Are you sure to delete this entreprise ?</ModalHeader>
                                <ModalFooter>
                                    <form>
                                    <Button color="primary" onClick={() => this.deleteEntrep(e.id)}>delete</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </form>
                                </ModalFooter>
                                </Modal>

                                <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className}>
                                <ModalHeader toggle={this.toggle3}>Update Entreprise</ModalHeader>
                                <form>
                                <ModalBody>
                                
                                    <div className="form-group">
                                        <label htmlFor="nom">Nom</label>
                                        <input type="text" name="nom" className="form-control"
                                        onChange={this.onChange} value={this.state.nom} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="nom">Adress</label>
                                        <input type="text" name="nom" className="form-control" placeholder="Adress"
                                        onChange={this.onChange} value={this.state.adresse} />
                                    </div>
                                    
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => this.editEntrep(e.id)}>Update</Button>{' '}
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

export default Entreprise;