import React from 'react'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import { Table,Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';


const data = [
  { id:1, info:"Landing page", manager:"Walt Cosani", assigned: "Ignacio Truffa", status: <i class="fas fa-check-circle"></i>  },
  { id:2, info:"E-Commerce Shop", manager:"Walt Cosani",assigned: "Ignacio Truffa", status: <i class="fas fa-check-circle"></i> },
  { id:3, info:"CRM Linkroom", manager:"Walt Cosani",assigned: "Ignacio Truffa" , status: <i class="fas fa-check-circle"></i>  },
  
];


class App extends React.Component {
  state={
    data: data,
    form:{
      id:'',
      info:'',
      manager:'',
      assigned:'',
      status:''
    },
    modalInsertar: false,
    modalEditar: false,
  }

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,

      }  
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar:true}); 
  }

 ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
  }


  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro}); 
  }

 ocultarModalEditar=()=>{
    this.setState({modalEditar:false});
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar:false});
  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{

      if((dato.id==registro.id)){
        lista[contador].info=dato.info;
        lista[contador].manager=dato.manager;
      
      }

      contador++;

    });

    this.setState({data: lista, modalEditar:false});
  }

  eliminar=(dato)=>{
    var opcion= window.confirm("Realmente quieres Eliminar"+dato.id);
    if(opcion){
      var contador=0;
      var lista=this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador,1);
        }
        contador++;
      });
      this.setState({data: lista});

    }


   

  }

  render() {
    return(
    <div className="bg-light">
   
    
    <Navbar bg="white">
    
    <Navbar.Brand href="#home">
    <img
        src="https://i.ibb.co/wYp0c0k/logo.png"
        
      />
    
    </Navbar.Brand>
    </Navbar>
    
  
    <Navbar className="bg-white justify-content-between">
    <h4>My projects</h4>
    <Button color="danger" onClick={()=>this.mostrarModalInsertar()}>+ Add project</Button>
    
    </Navbar>
    <Container>
    <Table className="bg-white">
      <thead className="bg-light"><tr><th className="id">Id</th>
        <th>Project info</th>
        <th>Project Manager</th>
        <th>Assigned To</th>
        <th>Status</th>
        <th>Action</th>
        
        </tr></thead>
        <tbody>
          {this.state.data.map((elemento)=>(
            <tr>
              <td className="id">{elemento.id}</td>
              <td>{elemento.info}</td>
              <td>{elemento.manager}</td>
              <td>{elemento.assigned}</td>
              <td>{elemento.status}</td>
              <td>

              <div className="btn-group dropleft">
  <a type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i className="fas fa-ellipsis-v"></i>
  </a>
  <div className="dropdown-menu">
  <a role="button" color="primary" onClick={()=>this.mostrarModalEditar(elemento)}><i class="fas fa-edit"></i>Edit</a>
  <br/>
  <a  role="button" color="danger" onClick={()=>this.eliminar(elemento)}> <i class="fas fa-trash"></i> Delete</a>
  </div>
</div>
   
   
  

              
                {/* <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
            {"  "}
              <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button> */}

             
              
              </td>
            </tr>
          ))}
        </tbody>
    </Table>
    </Container>
   

    <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>
        <div>
          <h3>Add project</h3>
        </div>

      </ModalHeader>
    

    <ModalBody>
      <FormGroup>
        <label>Id:</label>
        <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>

      </FormGroup>

      <FormGroup>
        <label>Project name:</label>
        <input className="form-control" name="info" type="text" onChange={this.handleChange}/>

      </FormGroup>

      <FormGroup>
        <label>Project Manager:</label>
        <select id="manager"  class="form-control"  placeholder="Select a person" onChange={this.handleChange}>
      <option>Walt Cosani</option>
      <option>Walt Cosani</option>
      <option>Walt Cosani</option>
      
    </select>

      </FormGroup>
      <FormGroup>
        <label>Assigned to:</label>
        <select id="assigned" class="form-control" placeholder="Select a person"  onChange={this.handleChange}>
        <option>Ignacio Truffa</option>
        <option>Ignacio Truffa</option>
        <option>Ignacio Truffa</option>
     
    </select>

      </FormGroup>
      <FormGroup>
        <label>Status:</label>
        <select id="status" class="form-control" placeholder="Select a person" onChange={this.handleChange}>
      <option>Enabled</option>
      <option>Disabled</option>
    </select>

      </FormGroup>
    </ModalBody>

    <ModalFooter className="justify-content-between">
      <a role="button" color="danger" onClick={()=>this.ocultarModalInsertar()}> <i class="fas fa-long-arrow-alt-left"></i> Back </a>
      <Button color="danger" onClick={()=>this.insertar()}>Create project</Button>
      
   
    </ModalFooter>

    </Modal>


    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>
        <div>
          <h3>Edit Project</h3>
        </div>

      </ModalHeader>
    

    <ModalBody>
      <FormGroup>
        <label>Id:</label>
        <input className="form-control" readOnly type="text" value={this.state.form.id} />

      </FormGroup>

      <FormGroup>
        <label>Project name:</label>
        <input className="form-control" name="info" type="text" onChange={this.handleChange}/>

      </FormGroup>

      <FormGroup>
        <label>Project Manager:</label>
        {/* <input className="form-control" name="manager" type="text" /> */}
        <select id="manager"  class="form-control"  placeholder="Select a person" onChange={this.handleChange}>
      <option>Walt Cosani</option>
      <option>Walt Cosani</option>
      <option>Walt Cosani</option>
      
    </select>

      </FormGroup>
      <FormGroup>
        <label>Assigned to:</label>
        {/* <input className="form-control" name="manager" type="text" /> */}
        <select id="assigned" class="form-control" placeholder="Select a person" onChange={this.handleChange}>
        <option>Ignacio Truffa</option>
        <option>Ignacio Truffa</option>
        <option>Ignacio Truffa</option>
     
    </select>

      </FormGroup>
      <FormGroup>
        <label>Status:</label>
        {/* <input className="form-control" name="manager" type="text" /> */}
        <select id="status" class="form-control" placeholder="Select a person" onChange={this.handleChange}>
      <option>Enabled</option>
      <option>Disabled</option>
    </select>
      </FormGroup>
    </ModalBody>

    <ModalFooter className="justify-content-between">
      
      <a role="button" color="danger" onClick={()=>this.ocultarModalEditar()}><i class="fas fa-long-arrow-alt-left"></i> Back</a>
      <Button color="danger" onClick={()=>this.editar(this.state.form)}>Editar</Button>
      
    </ModalFooter>

    </Modal>


    </div>)
  };
}

export default App;
