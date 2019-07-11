import React from 'react';
import { connect } from 'react-redux';
import { fetchAllStore, insertStore, clearAllStore, deleteStore, updateStore } from '../../actions/store.actions';
import { showConfirm } from '../../helper/showConfirm';

class SingleStore extends React.Component {
    render() {
        const { storename, storedesc, storephone, createdOn } = this.props.store;
        const { onDeleteStore, onEditStore } = this.props;
        let datecreated = new Date(createdOn);
        const formatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        return (
            <div className="row">
                <div className="col card m-2">
                    <div className="card-body">
                        <h5 className="card-title">
                            {storename}
                        </h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                {storedesc}
                            </li>
                            <li className="list-group-item">
                                Phone: {storephone.join(', ')}
                            </li>
                            <li className="list-group-item">
                                <span className="badge badge-primary font-italic">{datecreated.toLocaleDateString("en-US", formatOptions)}</span>
                                <div className="btn-group float-right" role="group" aria-label="Basic example">
                                    <button className="btn btn-danger" onClick={onDeleteStore}>Delete</button>
                                    <button className="btn btn-info" onClick={onEditStore}>Edit</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

class FormStorePhone extends React.Component {

    renderDelete() {
        if (this.props.index !== 0) {
            return <button className="btn btn-danger" onClick={this.props.onDeletePhone} type="button">-</button>
        }
    }

    renderAdd() {
        if (this.props.showAdd) {
            return <button className="btn btn-primary" onClick={this.props.onAddPhone} type="button">+</button>
        }
    }

    render() {
        return (
            <div className="form-group row">
                <label htmlFor="phoneDesc" className="col-sm-2 col-form-label">Phone {this.props.index !== 0 ? this.props.index + 1 : ''}</label>
                <div className="col-sm-10 input-group">
                <input type="text" className="form-control" id="phoneDesc" placeholder="Store Phone" value={this.props.phone} onChange={this.props.onChange} />
                <div className="input-group-append" id="button-addon4">
                    {this.renderDelete()}
                    {this.renderAdd()}
                </div>
                </div>
            </div>
        );
    }
}

class FormStore extends React.Component {

    renderButton() {
        const { store, onAddStore, onUpdateStore } = this.props;
        if (store.id !== '') {
            return <button className="btn btn-primary" onClick={onUpdateStore}>Update Store</button>;
        } else {
            return <button className="btn btn-primary" onClick={onAddStore}>Add Store</button>;
        }
    }

    renderPhone = () => {
        const { storephone } = this.props.store;
        const { onAddPhone, onDeletePhone, onChangePhone } = this.props;

        if (storephone.length > 0) {
            return storephone.map((phone, index) => 
            <FormStorePhone key={index} phone={phone} index={index} showAdd={index === storephone.length - 1}
            onChange={(event) => onChangePhone(event, index)} 
            onAddPhone={onAddPhone} onDeletePhone={(event) => onDeletePhone(event, index)} />)
        }
    }

    render() {
        const { id, storename, storedesc } = this.props.store;
        const { onStoreDescChange, onStoreNameChange, onClearFields } = this.props;

        return (
            <React.Fragment>
            <div className="col">
                <div className="form-group row">
                    <label htmlFor="staticId" className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticId" value={id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="storeName" className="col-sm-2 col-form-label">Store Name</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="storeName" placeholder="Store Name" value={storename} onChange={onStoreNameChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="storeDesc" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                    <textarea type="text" className="form-control" id="storeDesc" placeholder="Store Description here..." value={storedesc} onChange={onStoreDescChange} />
                    <span className="badge badge-secondary float-right">{storedesc.length}/200</span>
                    </div>
                </div>
                {this.renderPhone()}
                
                {this.renderButton()}{' '}<button className="btn btn-primary" onClick={onClearFields}>Clear Fields</button>
                
            </div>
            </React.Fragment>
        );
    }
}

class StoreControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            storename: '',
            storedesc: '',
            storephone: ['']
        }
    }

    componentDidMount() {
        this.props.fetchAllStore();
    }

    _clearFields = () => {
        this.setState({
            id: '',
            storename: '',
            storedesc: '',
            storephone: ['']
        });
    }

    _getfilteredPhones = () => {
        let phones = this.state.storephone.filter(
            (v, i, arr) => {
                return v.trim() !== ''
            }
        );

        return phones;
    }

    _handleStoreNameChange = (event) => {
        if (event.target.value.match(/^.{0,100}$/)) {
            this.setState({
                storename: event.target.value
            });
        }
    }

    _handleStoreDescChange = (event) => {
        if (event.target.value.match(/^.{0,200}$/)) {
            this.setState({
                storedesc: event.target.value
            });
        }
    }

    _handleStorePhoneChange = (event, index) => {
        let phones = [...this.state.storephone];
        if (event.target.value.match(/^\d{0,12}$/)) {
            phones[index] = event.target.value;
        }
        
        this.setState({
            storephone: phones
        });
    }

    _handleAddStore = () => {
        this.props.insertStore({ query: { storename: this.state.storename, storedesc: this.state.storedesc, storephone: this._getfilteredPhones() } });
        this._clearFields();
    }

    _handleUpdateStore = (store) => {
        let body = {
            id: store.id,
            storename: store.storename,
            storedesc: store.storedesc,
            storephone: this._getfilteredPhones()
        };
        
        this.props.updateStore({ query: body });
        this._clearFields();
    }

    _handleDeleteStore = (store) => {
        showConfirm({ 
            message: `Want to delete this store?\n${store.storename}`, 
            success: () => { this.props.deleteStore({ query: store }) }
        });
    }

    _handleEditStore = (store) => {
        let phones = store.storephone.length === 0 ? [''] : store.storephone;
        this.setState({
            id: store.id,
            storename: store.storename,
            storedesc: store.storedesc,
            storephone: phones
        });
    }
    
    _handleAddPhone = () => {
        const { storephone } = this.state;

        if (storephone.length < 5) {
            this.setState({
                storephone: [...storephone, '']
            });
        }
    }

    _handleDeletePhone = (event, index) => {
        let phones = this.state.storephone.filter(
            (v, i, arr) => {
                if (arr.length > 1 && index > 0) {
                    
                    return i !== index
                } else {
                    return true;
                }
            }
        );

        this.setState({
            storephone: phones
        });

    }

    render() {
        const { fetchAllStore, clearAllStore, stores } = this.props;
        let storeEdit = {
            id: this.state.id,
            storename: this.state.storename,
            storedesc: this.state.storedesc,
            storephone: this.state.storephone
        }
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                    <h3>Store Control Page</h3>
                    </div>
                </div>
                
                <FormStore store={storeEdit}
                onAddStore={this._handleAddStore}
                onUpdateStore={() => this._handleUpdateStore(storeEdit)}
                onStoreNameChange={this._handleStoreNameChange} 
                onStoreDescChange={this._handleStoreDescChange}
                onClearFields={this._clearFields}
                onAddPhone={this._handleAddPhone}
                onDeletePhone={this._handleDeletePhone}
                onChangePhone={this._handleStorePhoneChange}
                /><br />
                
                <div className="row">
                    <div className="col">
                        <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn btn-outline-secondary" onClick={fetchAllStore}>Fetch All Store</button>
                        <button className="btn btn-outline-warning" onClick={clearAllStore}>Clear All Store</button>
                        </div>
                    </div>
                </div>

                {stores.map(store => 
                    <SingleStore 
                    key={store.id} 
                    store={store} 
                    onDeleteStore={() => this._handleDeleteStore(store)}
                    onEditStore={() => this._handleEditStore(store)} />)}
            </React.Fragment>
            
        );
    }
}

function mapStateToProps(state) {
    return {
        stores: state.stores
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllStore: () => dispatch(fetchAllStore()),
        insertStore: store => dispatch(insertStore(store)),
        clearAllStore: () => dispatch(clearAllStore()),
        deleteStore: store => dispatch(deleteStore(store)),
        updateStore: store => dispatch(updateStore(store))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreControl);