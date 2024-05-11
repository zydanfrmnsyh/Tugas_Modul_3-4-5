import React, { Component } from 'react';
import axios from 'axios';
import Navigasi from '../Components/Navigasi';

class Pegawai extends Component {
  constructor() {
    super();
    this.state = {
      pegawai: [],
      nip: "",
      nama: "",
      alamat: "",
      action: "",
      search: "",
    };
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.getPegawai();
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  Add = () => {
    this.setState({
      nip: "",
      nama: "",
      alamat: "",
      action: "insert"
    });
    this.modalRef.current.style.display = "block";
  }

  Edit = (item) => {
    this.setState({
      nip: item.nip,
      nama: item.nama,
      alamat: item.alamat,
      action: "update"
    });
    this.modalRef.current.style.display = "block";
  }

  getPegawai = () => {
    let url = "http://localhost:2910/pegawai";
    axios.get(url)
      .then(response => {
        this.setState({ pegawai: response.data.pegawai });
      })
      .catch(error => {
        console.log(error);
      });
  }

  SavePegawai = (event) => {
    event.preventDefault();
    let url = "";
    if (this.state.action === "insert") {
      url = "http://localhost:2910/pegawai/save"
    } else {
      url = "http://localhost:2910/pegawai/update"
    }

    let form = {
      nip: this.state.nip,
      nama: this.state.nama,
      alamat: this.state.alamat
    }

    axios.post(url, form)
      .then(response => {
        this.getPegawai();
        this.modalRef.current.style.display = "none";
      })
      .catch(error => {
        console.log(error);
      });
  }

  Drop = (nip) => {
    let url = `http://localhost:2910/pegawai/${nip}`;
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
        .then(response => {
          this.getPegawai();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="m-3 card">
        <Navigasi/>
        <div className="card-header bg-info text-white">Data Pegawai</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>NIP</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pegawai.map((item, index) => (
                <tr key={index}>
                  <td>{item.nip}</td>
                  <td>{item.nama}</td>
                  <td>{item.alamat}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info m-1"
                      onClick={() => this.Edit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger m-1"
                      onClick={() => this.Drop(item.nip)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-success"
            onClick={this.Add}
          >
            Tambah Data
          </button>
          <div className="modal" id="modal" ref={this.modalRef}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {this.state.action === "insert" ? "Tambah Data Pegawai" : "Edit Data Pegawai"}
                </div>
                <form onSubmit={this.SavePegawai}>
                  <div className="modal-body">
                    NIP
                    <input
                      type="number"
                      name="nip"
                      value={this.state.nip}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Nama
                    <input
                      type="text"
                      name="nama"
                      value={this.state.nama}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Alamat
                    <input
                      type="text"
                      name="alamat"
                      value={this.state.alamat}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-sm btn-success" type="submit">
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pegawai;
