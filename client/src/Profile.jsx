import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUser, fetchUserProducts, saveUserProduct, editUserProduct, deleteUserProduct, updateUserAva} from "./actions/actions";
import defaultAva from './images/default-ava.jpg';
import defaultProductImage from './images/default.jpg';
import { Link } from 'react-router-dom';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddProductModal: false,
            addName: '',
            addDescription: '',
            addCountry: '',
            addPrice: '',
            addCurrency: '',
            saveFile: null,
            showEditModal: false,
            editName: '',
            editDescription: '',
            editCountry: '',
            editPrice: '',
            editCurrency: '',
            editProductId: 0,
            editImage: null,
            editSaveFile: null,
        };
    }
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserProducts();
    }
    showAddProductModalEvent() {
        this.setState({
            showAddProductModal: true
        });
    }
    closeAddProductModalEvent() {
        this.setState({
            showAddProductModal: false
        });
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleAddProductSubmit() {
        const addName = this.state.addName;
        const addDescription = this.state.addDescription;
        const addCountry = this.state.addCountry;
        const addPrice = this.state.addPrice;
        const addCurrency = this.state.addCurrency;
        const image = this.state.saveFile;
        this.props.saveProduct(addName, addDescription, addCountry,addPrice,addCurrency, image,
            () => {
                this.setState({
                    showAddProductModal: false,
                    addName: '',
                    addDescription: '',
                    addCountry: '',
                    addPrice: '',
                    addCurrency: '',
                    saveFile: null
                });
            });
    }
    handleDelete(deleteId) {
        this.props.deleteProduct(deleteId);
    };
    handleFileChange(event) {
        this.setState({
            saveFile: event.target.files[0],
        });
    }
    handleEdit = (product) => {
        const name= product.name;
        const description = product.description;
        const country = product.country;
        const price = product.price;
        const currency = product.currency;
        const id = product._id;
        const image = product.image;
        this.setState({
            showEditModal: true,
            editName: name,
            editDescription: description,
            editCountry: country,
            editPrice: price,
            editCurrency: currency,
            editProductId: id,
            editImage: image,
        });
    };
    handleEditShowModal = (event) => {
        event.preventDefault();
        const showEditModal = this.state.showEditModal;
        this.setState({
            showEditModal: !showEditModal,
            editName: '',
            editDescription: '',
            editCountry: '',
            editPrice: '',
            editCurrency: '',
            editProductId: 0,
        });
    };
    handleEditProduct = (event) => {
        event.preventDefault();
        const editName = this.state.editName;
        const editDescription = this.state.editDescription;
        const editCountry = this.state.editCountry;
        const editPrice = this.state.editPrice;
        const editCurrency = this.state.editCurrency;
        const editProductId = this.state.editProductId;
        const editSaveFile = this.state.editSaveFile;
        const updateProduct = {
            name: editName,
            description: editDescription,
            country: editCountry,
            price: editPrice,
            currency: editCurrency,
            file: editSaveFile,
        };
        this.props.editProduct(editProductId, updateProduct, () => {
            this.setState({
                showEditModal: false,
                editName: '',
                editDescription: '',
                editCountry: '',
                editPrice: '',
                editCurrency: '',
            });
        });
    };

    handleEditFileImage(event) {
        this.setState({
            editSaveFile: event.target.files[0]
        })
    }
    handleAvatarChange(event) {
        const file = event.target.files[0];
        this.props.updateUserAva(file);
    }
    render() {
        const user = this.props.user;
        const products = this.props.products;
        const addName = this.state.props;
        const addDescription = this.state.props;
        const addCountry = this.state.props;
        const addPrice = this.state.props;
        const addCurrency= this.state.props;
        const showAddProductModal = this.state.showAddProductModal;
        const showEditModal = this.state.showEditModal;
        const editName = this.state.editName;
        const editDescription = this.state.editDescription;
        const editCountry = this.state.editCountry;
        const editPrice= this.state.editPrice;
        const editCurrency = this.state.editCurrency;
        const editImage = this.state.editImage;
        const editSaveFile = this.state.editSaveFile;
        return (
            <div>
                <h3>Hello, {user.login}</h3>
                <label htmlFor="fileInput">
                    { !user.avaPath &&
                    <img src={defaultAva} className="user-ava-img"/>
                    }
                    { user.avaPath &&
                    <img src={"http://localhost:3001" + user.avaPath + "?cb=" + (new Date().toTimeString())}
                         className="user-ava-img"/>
                    }
                </label>
                <input type="file" className="d-none" id="fileInput"
                       onChange={this.handleAvatarChange.bind(this)}
                />
                <div className="px-2 py-2">
                    { showAddProductModal &&
                    <div id="myModal" className="mymodal">
                        <div className="mymodal-content">
                            <div className="mymodal-header py-2">
                                <h2>Add new product</h2>
                                <span className="myclose" onClick={this.closeAddProductModalEvent.bind(this)}>&times;</span>
                            </div>
                            <div className="mymodal-body">
                                <div className="input-group my-3">
                                    <input value={addName} onChange={this.handleInputChange.bind(this)} name="addName" type="text" placeholder="Enter product name" className="form-control"/>
                                </div>
                                <div className="input-group my-3">
                                    <select type="text" className="form-control" name="addCountry" placeholder="country"
                                            onChange={this.handleInputChange.bind(this)} value={addCountry}>
                                        <option value="choose">Choose your country</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Russia">Russia</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </div>
                                <div className="input-group my-3">
                                    <input value={addPrice} onChange={this.handleInputChange.bind(this)} name="addPrice" type="text" placeholder="Enter price" className="form-control"/>
                                </div>
                                <div className="input-group my-3">
                                    <select type="text" className="form-control" name="addCurrency" placeholder="currency"
                                            onChange={this.handleInputChange.bind(this)} value={addCurrency}>
                                        <option value="choose">Choose your currency</option>
                                        <option value="KZT">KZT</option>
                                        <option value="RUB">RUB</option>
                                        <option value="$">$</option>
                                    </select>
                                </div>
                                <div className="input-group my-3">
                <textarea value={addDescription} onChange={this.handleInputChange.bind(this)} name="addDescription" placeholder="Enter description" className="form-control">
                </textarea>
                                </div>
                                <div className="input-group mt-3">
                                    <input type="file" onChange={this.handleFileChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="mymodal-footer">
                                <div className="my-2 text-right">
                                    <button className="btn btn-secondary mr-2" onClick={this.closeAddProductModalEvent.bind(this)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={this.handleAddProductSubmit.bind(this)}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div className="mb-2">
                        <button className="btn btn-success" onClick={this.showAddProductModalEvent.bind(this)}>
                            <i className="fas fa-plus"/>
                        </button>
                    </div>
                    <ul className="list-group">
                        {
                            products.map((product) => {
                                return (
                                    <li key={product._id} className="list-group-item" >
                                        { product.image &&
                                        <img src={product.image} alt="Post image"/>
                                        }
                                        { !product.image &&
                                        <img src={defaultProductImage} alt="Post image"/>
                                        }
                                        <p>Product name:{product.name}</p>
                                        <p>Country:{product.country}</p>
                                        <p>Description:{product.description}</p>
                                        <p>Price:{product.price}{product.currency}</p>
                                        <button className="btn btn-danger mx-2" onClick={this.handleDelete.bind(this, product._id)}>
                                            <i className="fas fa-trash"/>
                                        </button>
                                        <button className="btn btn-warning" onClick={this.handleEdit.bind(this, product)}>
                                            <i className="fas fa-pencil-alt"/>
                                        </button>
                                        <Link to={"/detail/" + product._id} className="btn btn-secondary ml-2">
                                            <i className="fas fa-eye"/>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {showEditModal &&
                    <div className="mymodal">
                        <div className="mymodal-content">
                            <div className="mymodal-header py-2">
                                <h2>Edit your product</h2>
                                <span className="myclose" onClick={this.handleEditShowModal.bind(this)}>&times;</span>
                            </div>
                            <div className="mymodal-body">
                                <div className="input-group mt-3">
                                    <label htmlFor="editFile">
                                        { editImage &&
                                        <img src={editImage} alt="Post image" className="editPostImage"/>
                                        }
                                        { !editImage &&
                                        <img src={defaultProductImage} alt="Post image" className="editPostImage"/>
                                        }
                                    </label>
                                    {editSaveFile && <span className="text-success">File chosen!</span>}
                                    <input type="file" id="editFile" className="d-none" onChange={this.handleEditFileImage.bind(this)}/>
                                </div>
                                <div className="input-group mt-3">
                                    <input type="text" className="form-control" name="editName" placeholder="name"
                                           onChange={this.handleInputChange.bind(this)} value={editName}/>
                                </div>
                                <div className="input-group mt-3">
                                    <select type="text" className="form-control" name="editCountry" placeholder="country"
                                            onChange={this.handleInputChange.bind(this)} value={editCountry}>
                                        <option value="choose">Choose your country</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Russia">Russia</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </div>
                                <div className="input-group mt-3">
                                    <input type="text" className="form-control" name="editPrice" placeholder="Price"
                                           onChange={this.handleInputChange.bind(this)} value={editPrice}/>
                                </div>
                                <div className="input-group mt-3">
                                    <select type="text" className="form-control" name="editCurrency" placeholder="currency"
                                            onChange={this.handleInputChange.bind(this)} value={editCurrency}>
                                        <option value="choose">Choose your currency</option>
                                        <option value="KZT">KZT</option>
                                        <option value="RUB">RUB</option>
                                        <option value="$">$</option>
                                    </select>
                                </div>
                                <div className="input-group mt-3">
                <textarea type="text" className="form-control" name="editDescription" placeholder="Description..."
                          onChange={this.handleInputChange.bind(this)} value={editDescription}/>
                                </div>
                            </div>
                            <div className="mymodal-footer">
                                <div className="my-2">
                                    <button className="btn btn-secondary mr-2" onClick={this.handleEditShowModal.bind(this)}>Cancel</button>
                                    <button className="btn btn-success" onClick={this.handleEditProduct.bind(this)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        products: state.users.products,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => {
            dispatch(fetchUser());
        },
        fetchUserProducts: () => {
            dispatch(fetchUserProducts());
        },
        saveProduct: (addName, addDescription, addCountry,addPrice,addCurrency, saveImage, changeState) => {
            dispatch(saveUserProduct(addName, addDescription, addCountry,addPrice,addCurrency, saveImage, changeState))
        },
        editProduct: (id, newProduct, changeState) => {
            dispatch(editUserProduct(id, newProduct, changeState));
        },
        deleteProduct: (id) => {
            dispatch(deleteUserProduct(id));
        },
        updateUserAva: (file) => {
            dispatch(updateUserAva(file));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
