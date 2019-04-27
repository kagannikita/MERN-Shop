import React from 'react';
import { connect } from 'react-redux';
import {fetchProduct,fetchUser, saveComment, deleteComment,} from "./actions/actions";
import defaultImg from './images/default.jpg';
import { Link } from 'react-router-dom';
import defaultUserImage from './images/default-ava.jpg';
import jwtDecode from 'jwt-decode';
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddCommentForm: false,
            commentText: '',
        }
    }
    componentDidMount() {
        const productId = this.props.match.params.productId;
        this.props.fetchProduct(productId);
        this.props.fetchUser();
    }
    showAddCommentFormEvent() {
        this.setState({
            showAddCommentForm: true
        })
    }
    closeAddCommentFormEvent() {
        this.setState({
            showAddCommentForm: false
        })
    }
    saveComment(event) {
        event.preventDefault();
        this.props.saveComment(this.props.fetchedProduct._id, this.state.commentText, () => {
            this.setState({
                showAddCommentForm: false,
                commentText: ''
            })
        });
    }
    handleTextAreaChange(event) {
        this.setState({
            commentText: event.target.value
        })
    }
    handleDeleteComment(commentId) {
        this.props.deleteComment(this.props.fetchedProduct._id, commentId);
    }
    render() {
        const product = this.props.fetchedProduct;
        console.log('product ', product);
        const productImage = product && product.image ? product.image : defaultImg;
        const authenticated = this.props.authenticated;
        const showAddCommentForm = this.state.showAddCommentForm;
        const commentText = this.state.commentText;
        const user = this.props.user;
        let userId;

        if (authenticated) {
            const decodedToken = jwtDecode(localStorage.getItem('token'));

            userId = decodedToken.id;
        }

        return (
            <div className="px-2 py-2">
                <Link to="/" className="btn btn-light"><i className="fas fa-arrow-left"></i></Link>
                {!product &&
                <p>Loading ...</p>
                }

                {product &&
                <div>
                    <h1>{product.name}</h1>
                    <img src={productImage} alt="Product image" className="d-block productDetailImage"/>
                    <p className="mt-2">{product.description}</p>
                    {user.login}
                    { authenticated &&
                    <div className="my-3">

                        <button className="btn btn-success" onClick={this.showAddCommentFormEvent.bind(this)}>Add comment</button>
                        {showAddCommentForm &&
                        <form className="add-comment-form">
              <textarea placeholder="Your comment " className="form-control my-2" value={commentText}
                        onChange={this.handleTextAreaChange.bind(this)}/>
                            <button className="btn btn-warning mr-2" onClick={this.closeAddCommentFormEvent.bind(this)}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.saveComment.bind(this)}>Save comment</button>
                        </form>
                        }
                    </div>

                    }


                    {product.comments.length > 0 && <h3>Comments:</h3>}
                    <ul className="list-group">
                        {product.comments.map(comment => {
                            return (
                                <li
                                    key={comment._id}
                                    className="list-group-item">
                                    <p className="comment">
                                        {comment.user.avaPath && <img src={"http://localhost:3001" + comment.user.avaPath}/> }
                                        { !comment.user.avaPath && <img src={defaultUserImage} /> }
                                        {comment.user.login}
                                    </p>
                                    {comment.text}
                                    {comment.user._id === userId &&
                                    <button type="button" className="btn btn-danger d-block" onClick={this.handleDeleteComment.bind(this, comment._id)}>
                                        <i className="fas fa-trash-alt"/>
                                    </button>
                                    }
                                </li>
                            )
                        })}
                    </ul>

                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetchedProduct: state.products.fetchedProduct,
        authenticated: state.users.authenticated,
        user: state.users.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProduct: (productId) => {
            dispatch(fetchProduct(productId))
        },
        saveComment: (productId, commentText, successCallback) => {
            dispatch(saveComment(productId, commentText, successCallback))
        },
        deleteComment: (productId, commentId) => {
            dispatch(deleteComment(productId, commentId))
        },
        fetchUser: () => {
            dispatch(fetchUser());
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
