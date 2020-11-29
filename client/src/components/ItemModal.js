import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import { v4 as uuid } from "uuid";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: uuid(),
      name: this.state.name,
    };

    // Add item via addItem redux action
    this.props.addItem(newItem);

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Ajouter élément
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Ajouter à la liste d'achat
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Ajouter un truc à consoom"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }}>
                  Ajouter élément
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
