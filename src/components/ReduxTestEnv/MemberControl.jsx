import React from 'react';
import { connect } from 'react-redux';
import { fetchAllMember, fetchAllMemberPage, addMember, setMember, removeMember } from '../../actions/member.actions';
import { showConfirm } from '../../helper/showConfirm';
import { DEF_PAGE_ITEM } from '../../helper/env'

class TableMemberRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: [''],
            active: false,
            editMode: false
        }
    }

    _onClickToEdit = (event) => {
        const { member } = this.props;
        let phones = member.phone.length > 0 ? member.phone : [''];
        this.setState({
            id: member.id,
            firstname: member.firstname,
            lastname: member.lastname,
            email: member.email,
            phone: phones,
            active: member.active,
            editMode: true
        });
    }

    _onDoneEditing = () => {
        const { id, firstname, lastname, email, phone, active } = this.state;
        
        this.props.setMember({ member: {
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                active: active,
            } 
        });

        this._clearFields();
    }

    _onCancelEditing = () => {
        this.setState({
            editMode: false
        });
    }

    _onEditText = (event) => {
        const { name, value } = event.target;

        if (name === 'phone') {
            if (value.match(/^\d{0,12}$/)) {
                let phones = [...this.state.phone];
                phones[0] = value;
                this.setState({
                    phone: phones
                });
            }
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    _onDelete = () => {
        showConfirm({
            message: `Are you sure want to delete this item? \n${this.state.firstname} ${this.state.lastname} \n${this.state.email}`,
            success: () => {
                this.props.onDelete();
                this._onCancelEditing();
            },
            cancel: () => this._onCancelEditing()
        });
    }

    _toggleEditActive = () => {
        this.setState({
            active: !this.state.active
        });
    }

    _clearFields = () => {
        this.setState({
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: [''],
            active: '',
            editMode: false
        });
    }

    renderRow() {
        const { member, index } = this.props;
        const { firstname, lastname, email, phone } = this.state;
        if (this.state.editMode) {
            return (
            <React.Fragment>
            <tr>
                <td>{index}</td>
                <td>
                    <input type="text" 
                    className="form-control"
                    value={firstname} 
                    name="firstname" 
                    onChange={this._onEditText} />
                </td>
                <td>
                    <input type="text"
                    className="form-control"
                    value={lastname} 
                    name="lastname" 
                    onChange={this._onEditText} />
                </td>
                <td>
                    <input type="text"
                    className="form-control"
                    value={email} 
                    name="email" 
                    onChange={this._onEditText} />
                </td>
                <td>
                    <input type="text"
                    className="form-control"
                    value={phone[0]} 
                    name="phone" 
                    onChange={this._onEditText} />
                </td>
                <td className="cursor-hand" onClick={this._toggleEditActive}>{this.state.active ? '✔' : '❌'}</td>
            </tr>
            <tr>
                <td></td>
                <td colSpan={5}>
                    <div className="float-right">
                        {this.renderButton()}
                    </div>
                </td>
            </tr>
            </React.Fragment>
            )
        } else {
            const phone = member.phone.length > 0 ? member.phone[0] : '';
            return (
            <tr onClick={this._onClickToEdit}>
                <td>{index}</td>
                <td>
                    <input type="text" className="form-control readonlyedit"
                    value={member.firstname} readOnly></input>
                </td>
                <td>
                    <input type="text" className="form-control readonlyedit"
                    value={member.lastname} readOnly></input>
                </td>
                <td>
                    <input type="text" className="form-control readonlyedit"
                    value={member.email} readOnly></input>
                </td>
                <td>
                    <input type="text" className="form-control readonlyedit"
                    value={phone} readOnly></input>
                </td>
                <td>{member.active ? '✔' : '❌'}</td>
            </tr>
            )
        }
    }

    renderButton() {
        return (
            <React.Fragment>
                <button className="btn btn-danger" onClick={this._onDelete}>delete</button>{' '}
                <button className="btn btn-warning" onClick={this._onCancelEditing}>cancel</button>{' '}
                <button className="btn btn-primary" onClick={this._onDoneEditing}>done</button>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderRow()}
            </React.Fragment>
        )
    }
}

class TableMember extends React.Component {
    render() {
        return (
            <table className="table table-bordered table-hover">
            <thead>
                <tr>
                <th scope="col">Num</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Active</th>
                </tr>
            </thead>
            <tbody>
                {this.props.members.map(
                    (member, index) =>
                        member !== null ? <TableMemberRow key={index} index={index + this.props.meta.rowNum} member={member} 
                        setMember={this.props.setMember} 
                        onDelete={() => this.props.onDelete({member})} /> : ''
                    )
                }
            </tbody>
            </table>
        );
    }
}

class MemberNewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: [''],
            active: false
        }
    }

    _onEditText = (event) => {
        const { name, value } = event.target;

        if (name === 'phone') {
            let phones = [...this.state.phone];
            phones[0] = value;
            this.setState({
                phone: phones
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    _onCloseModal = () => {
        this._clearFields();
    }

    _clearFields = () => {
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            phone: [''],
            active: false
        });
    }

    _onAddNewMember = () => {
        const { firstname, lastname, email, phone, active } = this.state;
        this.props.onAddNewMember({ member: {
                id: Math.floor(100000 + Math.random() * 900000),
                firstname,
                lastname,
                email,
                phone,
                active
            }
        });
        this._onCloseModal();
    }

    _toggleEditActive = () => {
        this.setState({
            active: !this.state.active
        });
    }

    render() {

        const { firstname, lastname, email, active } = this.state;

        let phone = this.state.phone[0];

        return (
            <div className="modal fade" id="newMemberModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Member</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control" name="firstname" value={firstname} onChange={this._onEditText} placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control" name="lastname" value={lastname} onChange={this._onEditText} placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={this._onEditText} placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" className="form-control" name="phone" value={phone} onChange={this._onEditText} placeholder="Phone" />
                        </div>
                        <div className="form-group">
                            <div className="cursor-hand" onClick={this._toggleEditActive}>Active? : {active ? '✔' : '❌'}</div>
                        </div>
                    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this._onCloseModal}>Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._onAddNewMember}>Add New Member</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

class MemberPagesNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page,
            editMode: false
        }
    }

    _handleChangePage = (event) => {
        if (event.target.value.match(/^\d$/) || event.target.value === '') {
            this.setState({
                page: event.target.value
            });
        }
    }

    _handleBlur = () => {
        if (this.state.page === '') {
            this.setState({
                page: 1
            });
        }

        this.setState({
            editMode: false
        });
        this.props.onPageChange({ page: this.state.page });
    }

    _handleClickToEdit = () => {
        this.setState({
            page: this.props.page,
            editMode: true
        });
    }

    renderPageInput = () => {
        if (this.state.editMode) {
            return <input type="text" className="form-control" placeholder="page" value={this.state.page} onChange={this._handleChangePage} onBlur={this._handleBlur} />
        } else {
            return <input type="text" readOnly className="form-control" placeholder="page" value={this.props.page} onClick={this._handleClickToEdit} />
        }
    }

    render() {
        const { totalPages, hasPrevPage, hasNextPage } = this.props.meta;

        return (
            <div className="row">
                <div className="col">
                    <button className="btn btn-block btn-primary" disabled={!hasPrevPage} onClick={this.props.onPrev}>Prev</button>
                </div>
                <div className="col">
                    <div className="form-row">
                        <div className="col">
                        {this.renderPageInput()}
                        </div>
                        <div className="col">
                            <input type="text" readOnly className="form-control-plaintext" value={ "of " + totalPages + " pages"} />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="btn btn-block btn-primary" disabled={!hasNextPage} onClick={this.props.onNext}>Next</button>
                </div>
            </div>
        );
    }
}

class MemberControl extends React.Component {
    componentWillMount() {
        this.props.fetchAllMember();
    }

    _handleAddNewMember = ({member}) => {
        this.props.addMember({member});
    }

    _handleSetMember = ({member}) => {
        this.props.setMember({member});
    }

    _handleDeleteMember = ({member}) => {
        this.props.removeMember({member});
    }

    _handleGoToPage = ({ page }) => {
        console.log('MemberControl._handleGoToPage', page);
        this.props.fetchAllMemberPage(page, DEF_PAGE_ITEM);
    }

    _handleChangePage = ({ page }) => {
        if (page !== this.props.meta.page) {
            this._handleGoToPage({ page });
        }
    }

    render() {
        const { members, meta } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                    <h3>
                        Member Control Page
                    </h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-outline-success btn-block" data-toggle="modal" data-target="#newMemberModal">
                            Add
                        </button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary btn-block" onClick={this.props.fetchAllMember}>
                            Refresh Members
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <span className="badge badge-pill badge-info font-italic">click to edit</span>
                        <TableMember members={members} meta={meta}
                            setMember={this._handleSetMember} 
                            onDelete={this._handleDeleteMember} 
                            />
                    </div>
                </div>

                <MemberPagesNav meta={meta} page={meta.page}
                    onPageChange={this._handleChangePage}
                    onNext={() => this._handleGoToPage({ page: meta.page + 1})}
                    onPrev={() => this._handleGoToPage({ page: meta.page - 1})} />

                <MemberNewModal onAddNewMember={this._handleAddNewMember} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        members: state.members,
        meta: state.meta.members
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllMember: () => dispatch(fetchAllMember()),
        fetchAllMemberPage: (page, limit) => dispatch(fetchAllMemberPage({ page, limit })),
        addMember: member => dispatch(addMember(member)),
        setMember: member => dispatch(setMember(member)),
        removeMember: member => dispatch(removeMember(member))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberControl);