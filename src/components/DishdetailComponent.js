import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal
         ,ModalHeader, ModalBody, Label, Button, Col, Row } from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
//import moment from 'moment';

const required    = (val) => val && val.length;
const maxLength   = (len) => (val) => !(val) || (val.length <= len);
const minLength   = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
      super(props);
        this.state={
            rating: '',
            name: '',
            comment: '',            
            isModalOpen: false
        };
      this.toggleModal          = this.toggleModal.bind(this);
      this.handleCommentSubmit  = this.handleCommentSubmit.bind(this);
  
    }

    toggleModal()  {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSubmit (values) {
        this.toggleModal();
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values)); 

    }

    render() {
        return (
            <div>
              <Button outline color="secondary" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg m-1"/> Submit Comment
              </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating </Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating" 
                                         className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Control.select>                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name </Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name" placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}                                        
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />                                     
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
            </Modal>              
            </div>
          );
    }
    
}
    function RenderComments({comments}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    {/*{ moment(comment.date).format("ll")}*/}
                    </p>
                </li>                
            );
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm/>
            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function DishDetail(props) {
    //const DishDetail = (props) => {
        const dish = props.dish
        if (dish == null) {
            return (<div></div>)
        }
        //const dishItem = this.renderDish(dish)

        return (
            <div className='container'>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to='/home'> Home </Link> </BreadcrumbItem>
                        <BreadcrumbItem> <Link to='/menu'> Menu </Link> </BreadcrumbItem>
                        <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>                        
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3> {props.dish.name}</h3>
                    <hr/>
                </div>

                <div className="row">                    
                    <RenderDish dish={props.dish} />                
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
    }


export default DishDetail