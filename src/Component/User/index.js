import React, { Component } from "react";
import "./css.css";
import axiosFetch from "../../axios";
import { connect } from "react-redux";
import { deleteDataUser_Action, getDataUserByID_Action, getUpdateDataUser_Action } from "../../reducer/getData.action";
import { url } from "../../axios/domainUrl";

class User extends Component {

  state = {
    name: "",
    email: "",
    sdt: "",
    address: "",
    avatar: {}
  }

  uploadImages = async (e) => {
    await this.setState({ avatar: e.target.files[0] })
    let fromData = new FormData()
    fromData.append("avatar", this.state.avatar)
    await axiosFetch(`${url}/uploadAvatar/${this.props.dataItem._id}`, "PUT", fromData)
      .then(user => console.log(user))
      .catch(err => console.log(err))
  }


  clickUser = (data) => {
    this.props.getuserById(data)
  };

  deleteUser = async (id) => {
    await axiosFetch(`${url}/${id}`, "DELETE", null)
      .then((result) => {
        alert(result.data.status)
        this.props.deleteUserReducer(id)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };


  render() {
    const data = this.props.dataItem;
    return (
      <div
        className="User_container"
        onClick={() => {
          this.clickUser(data);
        }}
      >
        <div className="User_container_content">
          <img src={data.avatar} alt="" />
          <div className="divUpload" >
            <i className="fas fa-upload"></i>
            <div className="inputUpload">
              <input type="file" className="uploadImages" name="avatar" onChange={this.uploadImages} />
            </div>
          </div>
          <div>
            <p className="User_name">{data.name}</p>
            <p className="User_email">{data.email}</p>
          </div>
        </div >
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item"></li>
            <li
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              data-bs-whatever="@mdo"
              onClick={() => {
                this.props.updateUser(data);
              }}
            >
              Sửa
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                this.deleteUser(data._id);
              }}
            >
              Xóa
            </li>
          </ul>
        </div>
      </div >
    );
  }
}

const mapDispacthToProps = (dispacth) => {
  return {
    getuserById: (data) => {
      dispacth(getDataUserByID_Action(data))
    },
    updateUser: (data) => {
      dispacth(getUpdateDataUser_Action(data))
    },
    deleteUserReducer: (id) => {
      dispacth(deleteDataUser_Action(id))
    }
  }
}

export default connect(null, mapDispacthToProps)(User);