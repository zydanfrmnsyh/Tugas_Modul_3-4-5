import React, { Component } from "react";
import Card from "../Components/Card";
import Navigasi from "../Components/Navigasi";
import { Modal } from "bootstrap";


class Gallery extends Component {

  Add = () => {
    Modal.getOrCreateInstance("#modal_buku").show();
    this.setState({
      isbn: Math.random().toString(),
      judul: "",
      penulis: "",
      penerbit: "",
      cover: "",
      harga: 0,
      action: "insert",
    });
  };


  Edit = (item) => {
    Modal.getOrCreateInstance("#modal_buku").show();
    this.setState({
      isbn: item.isbn,
      judul: item.judul,
      penulis: item.penulis,
      penerbit: item.penerbit,
      cover: item.cover,
      harga: item.harga,
      action: "update",
      selectedItem: item,
    });
  };

  Save = (event) => {
    event.preventDefault();
    let tempBuku = this.state.buku;

    if (this.state.action === "insert") {
      tempBuku.push({
        isbn: this.state.isbn,
        judul: this.state.judul,
        penulis: this.state.penulis,
        penerbit: this.state.penerbit,
        cover: this.state.cover,
        harga: this.state.harga,
      });
    } else if (this.state.action === "update") {
      let index = tempBuku.indexOf(this.state.selectedItem);
      tempBuku[index].isbn = this.state.isbn;
      tempBuku[index].judul = this.state.judul;
      tempBuku[index].penulis = this.state.penulis;
      tempBuku[index].penerbit = this.state.penerbit;
      tempBuku[index].cover = this.state.cover;
      tempBuku[index].harga = this.state.harga;
    }
    this.setState({ buku: tempBuku });

    Modal.getOrCreateInstance("#modal_buku").hide();
  };

  Drop = (item) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let tempBuku = this.state.buku;
      let index = tempBuku.indexOf(item);
      tempBuku.splice(index, 1);
      this.setState({ buku: tempBuku });
    }
  };

  searching = (event) => {
    if (event.keyCode === 13) {
      let keyword = this.state.keyword.toLowerCase();
      let tempBuku = this.state.buku;
      let result = tempBuku.filter((item) => {
        return (
          item.judul.toLowerCase().includes(keyword) ||
          item.penulis.toLowerCase().includes(keyword) ||
          item.penerbit.toLowerCase().includes(keyword)
        );
      });
      this.setState({ filterBuku: result });
    }
  };

  constructor() {
    super();
    this.state = {
      buku: [
        {
          isbn: "12345",
          judul: "Bulan",
          penulis: "Tere Liye",
          penerbit: "CV Harapan Kita",
          harga: 90000,
          cover:
            "https://o-cdn-cas.sirclocdn.com/parenting/images/img20220905_11324048.width-800.format-webp.webp",
        },
        {
          isbn: "12346",
          judul: "Anak Badai",
          penulis: "Tere Liye",
          penerbit: "CV Nusa Bangsa",
          harga: 80000,
          cover: "https://cdn.gramedia.com/uploads/items/9786239607425.jpg",
        },
        {
          isbn: "54321",
          judul: "Bumi",
          penulis: "Tere Liye",
          penerbit: "CV Nusa Bangsa",
          harga: 70000,
          cover:
            "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-2860984/gramedia_bumi---new-cover_full02.jpg",
        },
      ],
      action: "",
      isbn: "",
      judul: "",
      penulis: "",
      penerbit: "",
      harga: 0,
      keyword: "",
      filterBuku: "",
      cover: "",
      selectedItem: null,
    };
    this.state.filterBuku = this.state.buku;

    
  }


// SETTING ALERT
componentDidMount() {
    this.setUser();
  }

  setUser = () => {
    if (localStorage.getItem("user") === null) {
      let prompt = window.prompt("Masukkan Nama Anda", "");
      if (prompt === null || prompt === "") {
        this.setUser();
      } else {
        localStorage.setItem("user", prompt);

        this.setState({ user: prompt });
      }
    } else {
      let name = localStorage.getItem("user");
      this.setState({ user: name });
    }
  };


//   KERENJANG
addToCart = (selectedItem) => {
    let tempCart = []
    if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
    }

    let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)

    if(existItem){
        window.alert("Anda telah memilih item ini")
    }else{
        let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
        if(promptJumlah !== null && promptJumlah !== ""){

            selectedItem.jumlahBeli = promptJumlah
            
            tempCart.push(selectedItem)
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }
}


  // SEARCHBAR
  render() {
    return (
        // NAMA PENGGUNA/HEADER
      <div className="container">
        <Navigasi/>
        <h4 className="text-info my-2 text-center">Nama Pengguna: {this.state.user}</h4>

        <input
          type="text"
          className="form-control my-2"
          placeholder="Pencarian"
          value={this.state.keyword}
          onChange={(ev) => this.setState({ keyword: ev.target.value })}
          onKeyUp={(ev) => this.searching(ev)}
        />

        <div className="row pb-3">
          {this.state.filterBuku.map((item, index) => (
            <Card
              judul={item.judul}
              penulis={item.penulis}
              penerbit={item.penerbit}
              harga={item.harga}
              cover={item.cover}
              onEdit={() => this.Edit(item)}
              onDrop={() => this.Drop(item)}
              onCart={ () => this.addToCart(item)}
            />
          ))}
        </div>

        {/* TAMBAHDATA */}
        <button className="btn btn-danger mb-5 " onClick={() => this.Add()}>
          Tambah Data
        </button>

        <div className="modal" id="modal_buku">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">Form Buku</div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.Save(ev)}>
                  Judul Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.judul}
                    onChange={(ev) => this.setState({ judul: ev.target.value })}
                    required
                  />
                  Penulis Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.penulis}
                    onChange={(ev) =>
                      this.setState({ penulis: ev.target.value })
                    }
                    required
                  />
                  Penerbit Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.penerbit}
                    onChange={(ev) =>
                      this.setState({ penerbit: ev.target.value })
                    }
                    required
                  />
                  Harga Buku
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={this.state.harga}
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                    required
                  />
                  Cover Buku
                  <input
                    type="url"
                    className="form-control mb-2"
                    value={this.state.cover}
                    onChange={(ev) => this.setState({ cover: ev.target.value })}
                    required
                  />
                  <button className="btn btn-info btn-warning" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}


export default Gallery;