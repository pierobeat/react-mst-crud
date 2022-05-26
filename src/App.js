import React, { useState, useEffect } from "react"
import { getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react";
import {
  Button,
  Modal
} from "react-bootstrap"
import Swal from "sweetalert2"

const App = ({store}) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const [CurrentId, setCurrentId] = useState(0)
  const [NameUpdate, setNameUpdate] = useState("");
  const [EmailUpdate, setEmailUpdate] = useState("");
  const [PhoneNumberUpdate, setPhoneNumberUpdate] = useState(0);

  useEffect(() => {
    console.log(getSnapshot(store.contacts));
  }, [store])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    const currentContact = store.contacts.find(contact => contact.id === parseInt(id))

    if(currentContact){
      setCurrentId(currentContact.id)
      setNameUpdate(currentContact.name)
      setEmailUpdate(currentContact.email)
      setPhoneNumberUpdate(currentContact.phoneNumber)
    }
    
    setShow(true);
  } 

  // update data
  const UpdateData = (e) => {
    e.preventDefault()

    const DataUpdate = {
      id: CurrentId,
      name: NameUpdate,
      email: EmailUpdate,
      phoneNumber: parseInt(PhoneNumberUpdate)
    }

    store.updateContact(CurrentId, DataUpdate)

    Swal.fire({
      icon: 'success',
      title: 'data Updated',
    })

    setShow(false);
  }

  // add new data
  const handleSubmit =(e) => {
    e.preventDefault()

    const checkName = store.contacts.find(contact => contact.name === Name && Name )
    const checkEmail = store.contacts.find(contact => contact.email === Email && Email )
    const checkNumber = store.contacts.find(contact => contact.phoneNumber === parseInt(PhoneNumber))

    if(checkName) {
      Swal.fire({
        icon: 'warning',
        title: 'This Name is Already Exist!',
      })
    } else if(checkEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'This Email is Already Exist!',
      })
    } else if(checkNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'This Phone Number is Already Exist!',
      })
    }else {
      const data = {
        id: store.contacts.length  === 0 ? 1 : store.contacts[store.contacts.length - 1].id + 1,
        name: Name,
        email: Email,
        phoneNumber: parseInt(PhoneNumber === "" ? "0" : PhoneNumber)
      }

      store.addContact(data)

      Swal.fire({
        icon: 'success',
        title: 'New Data Added',
      })

      setName("")
      setEmail("")
      setPhoneNumber("")
    }
  }

  return(
    <div className="container">
      <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>UPDATE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="form-group mb-3">
                <input type="text" placeholder="Input Name" className="form-control" value={NameUpdate} onChange={e => setNameUpdate(e.target.value)} required />
              </div>
              <div className="form-group mb-3">
                <input type="text" placeholder="Input Email" className="form-control" value={EmailUpdate} onChange={e => setEmailUpdate(e.target.value)} required />
              </div>
              <div className="form-group mb-3">
                <input type="text" placeholder="Input Phone Number" className="form-control" value={PhoneNumberUpdate} onChange={e => setPhoneNumberUpdate(e.target.value)} required />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={UpdateData}>
            Update Contact
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover mt-2">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {
              store.contacts.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phoneNumber}</td>
                  <td className="d-flex justify-content-center">
                    <button type="button" onClick={() => store.removeContact(e)} className="btn btn-small btn-danger me-2">Delete</button>
                    <Button variant="primary" onClick={() => handleShow(e.id)}>
                      Update
                    </Button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
        <h2 className="display-3 my-5 text-center">
          Add Contact
        </h2>
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input type="text" placeholder="Input Name" className="form-control" value={Name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <input type="text" placeholder="Input Email" className="form-control" value={Email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <input type="text" placeholder="Input Phone Number" className="form-control" value={PhoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
            </div>
            <div className="form-group mb-3">
              <input type="submit" value="Add Contact" className="btn btn-block btn-dark" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default observer(App);