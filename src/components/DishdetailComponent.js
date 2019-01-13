import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal
         ,ModalHeader, ModalBody, Label, Button} from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating" >Rating </Label>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name </Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name"
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
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
            </Modal>
            </div>
          );
    }

}
    function RenderComments({comments, postComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = <Stagger in> 
            {comments.map(comment => {
            return (
                <Fade in key={comment.id}>
                    <li>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author},
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        {/*{ moment(comment.date).format("ll")}*/}
                        </p>
                    </li>
                </Fade>
            );
        })}
        </Stagger>
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                            <Card>
                            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                    </FadeTransform>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function DishDetail(props) {
    //const DishDetail = (props) => {
        //const dish = props.dish

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {

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
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            )
        }
        else if (props.dish == null) {
            return (<div></div>)
        }
        //const dishItem = this.renderDish(dish)

    }


export default DishDetail