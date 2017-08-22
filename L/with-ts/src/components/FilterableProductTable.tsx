import * as React from 'react';
import { ValueEvent } from './Calculator';

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

interface Product {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
}
class ProductRow extends React.Component<{name: string; price: string, stocked: boolean}, null> {
    render (): JSX.Element {
        let name = this.props.stocked ?
        this.props.name :
        <span style={{color: 'red'}}>{this.props.name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.price}</td>
            </tr>
        );
    }
}
class ProductCategoryRow extends React.Component<{category: string}, null> {
    render (): JSX.Element {
        return (
            <tr>
                <td colSpan={2}>{this.props.category}</td>
            </tr>
        );
    }
}
class ProductTable extends React.Component<{products: Product[], filterText: string, inStockOnly: boolean}, null> {
    render (): JSX.Element {
        let rows: JSX.Element[] = [];
        let lastCategory: string;
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(
                <ProductRow 
                    name={product.name}
                    price={product.price} 
                    stocked={product.stocked} 
                    key={product.name} 
                />
            );
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

interface FPTState {
    filterText: string;
    inStockOnly: boolean;
}
interface SBProps extends FPTState {
    onFilterTextInput (arg: string): void;
    onInStockInput (arg: boolean): void;
}
class SerachBar extends React.Component<SBProps, null> {
    constructor (props: SBProps) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }
    handleFilterTextInputChange (e: ValueEvent) {
        this.props.onFilterTextInput(e.target.value);
    }
    handleInStockInputChange (e: {target: {checked: boolean}}) {
        this.props.onInStockInput(e.target.checked);
    }
    render (): JSX.Element {
        return (
            <form>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input 
                        type="checkbox" 
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    {'  '}
                    Only show productss in stock
                </p>
            </form>
        );
    }
}

export class FilterableProductTable extends React.Component<{}, FPTState> {
    constructor (props: {}) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }
    handleFilterTextInput (filterText: string): void {
        this.setState({
            filterText: filterText
        });
    }
    handleInStockInput (inStockOnly: boolean): void {
        this.setState({
            inStockOnly: inStockOnly
        });
    }
    render (): JSX.Element {
        return (
            <div>
                <SerachBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable 
                    products={PRODUCTS} 
                    filterText={this.state.filterText} 
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}