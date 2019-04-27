import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, changeSearchParams } from "./actions/actions";
import './styles/index.css';
import { Link } from 'react-router-dom';
import defaultProductImage from './images/default.jpg';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const perPage = this.props.perPage;
        const currentPage = this.props.currentPage;
        this.props.fetchProducts(perPage, currentPage);
    }
    changePage = (title) => {
        const page = parseInt(title);

        const perPage = this.props.perPage;
        const searchText = this.props.searchText;

        this.props.fetchProducts(perPage, page, searchText, () => {
            this.props.changeSearchParams(page, searchText);
        });
    };
    render() {
        const products = this.props.products;
        const total = this.props.total;
        const perPage = this.props.perPage;
        const currentPage = this.props.currentPage;
        const totalAmount = Math.ceil(total / perPage);
        const pages = [];
        for(let i = 1; i <= totalAmount; i++) {
            if (i == 1 || i == totalAmount || i == currentPage) {
                pages.push({
                    title: i
                })
            } else if(currentPage - 2 <= i && currentPage + 2 >= i) {
                pages.push({
                    title: i
                })
            }
        }
        return (
            <div className="px-2 py-2">

                <ul className="list-group">
                    {
                        products.map((product) => {
                            return (
                                <li key={product._id} className="list-group-item" >
                                    { product.image &&
                                    <img src={product.image} alt="product image"/>
                                    }

                                    { !product.image &&
                                    <img src={defaultProductImage} alt="product image"/>
                                    }
                                    <p> {product.name}</p>
                                    <p> {product.author && product.author.login|| ""}</p>
                                    <p>   {product.description}</p>
                                    <p>   {product.country}</p>
                                    <p>  {product.price}</p>
                                    <p> {product.currency}</p>
                                    <Link to={"/detail/" + product._id} className="btn btn-secondary ml-2">
                                        <i className="fas fa-eye"/>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="pagination">
                    {pages.map(page => {
                        const title = page.title;
                        return (
                            <li className={`page-item ${title === currentPage ? "active" : ""}`}>
                                <a className="page-link active" onClick={this.changePage.bind(this, title)}>{page.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        total: state.products.total,
        perPage: state.products.perPage,
        currentPage: state.products.currentPage,
        searchText: state.products.searchText,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: (perPage, currentPage, searchText, successCallback) =>
            dispatch(fetchProducts(perPage, currentPage, searchText, successCallback)),
        changeSearchParams: (page, searchText) =>
            dispatch(changeSearchParams(page, searchText))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
