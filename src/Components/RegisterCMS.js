import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';


class RegisterCMS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: "",
            email: "",
            numberphone: "",
            password: "",
            password_confirm: "",
            status_btn_submit: false
        }
    };
    

    on_change = (event)=>{
        this.setState({
            [event.target.name]: event.target.value.trim()
        });

        if (this.state.fullname.trim() === "" || this.state.email.trim() === "" || this.state.numberphone.trim() === "" || this.state.password.trim() === "" || this.state.password_confirm.trim() === ""){
            this.setState({status_btn_submit: false});
        }
        else{
            this.setState({status_btn_submit: true})
        }
    };

    post_data_form = ()=>{
        var id = uuidv1();
        const account = {
            id: id,
            fullname: this.state.fullname,
            email: this.state.email,
            numberphone: this.state.numberphone,
            password: this.state.password 
        }
        // console.log("POST success ! ", account);
        axios.post('http://db.kingattorneyapp.com/register', account).then((result)=>{
            // console.log(result.data);
            if (result.data.error === true){
                this.props.notification('danger', result.data.msg, 'top-right');
            }
            else{
                this.props.notification('success', result.data.msg, 'bottom-right');
                setTimeout(()=>this.props.display_register_page(false), 1000);
            }
        });
    }

    on_submit_form = (event)=>{

        if (this.state.fullname.length < 5){
            this.props.notification('warning', 'Họ và tên trên 4 ký tự !', 'bottom-right');
        }
        else if (this.state.password_confirm !== this.state.password){
            this.props.notification('warning', 'Nhập lại mật khẩu không đúng !', 'bottom-right');
        }
        else{
            this.post_data_form();
        };
        event.preventDefault();
    };

    display_btn_submit = ()=>{
        if (this.state.status_btn_submit === true) return <button type="submit" className="btn btn-success btn-lg btn-block mt-4">Đăng ký</button>
        return <button type="text" disabled className="btn btn-success btn-lg btn-block mt-4">Đăng ký</button>
    };

    render() {
        return (
            <main className="info-register-page">
                <img src="/img/comming-soon.png" alt="comming-soon" className="comming-soon" />
                <div className="container d-flex justify-content-left align-items-center">
                    <form className="form-info" onSubmit={(event)=>this.on_submit_form(event)} method="POST">
                        <div className="form-group">
                            <label htmlFor="fullname">Họ và tên</label>
                            <input type="text" onChange={(event)=>this.on_change(event)} className="form-control" name="fullname" placeholder="Nhập họ và tên vào đây" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={(event)=>this.on_change(event)} className="form-control" name="email" placeholder="Nhập email vào đây" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberphone">Số điện thoại</label>
                            <input type="text" onChange={(event)=>this.on_change(event)} className="form-control" name="numberphone" placeholder="Nhập số điện thoại vào đây" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" onChange={(event)=>this.on_change(event)} className="form-control" name="password" placeholder="Nhập mật khẩu vào đây" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Nhập lại mật khẩu</label>
                            <input type="password" onChange={(event)=>this.on_change(event)} className="form-control" name="password_confirm" placeholder="Nhập lại mật khẩu vào đây" />
                        </div>
                        {this.display_btn_submit()}
                    </form>
                </div>
            </main>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        notification: (type_notifi, title_notifi, position) => {
            dispatch({type: "NOTIFICATION", type_notifi, title_notifi, position})
        },
        display_register_page: (status) => {
            dispatch({type: "DISPLAY_REGISTER_PAGE", status})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCMS)