const { options } = require("./../options/mariaDB");
const knex = require("knex")(options);

const socketsEventsProduct = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    knex
      .from("product")
      .select("*")
      .then((products) => {
        io.sockets.emit("product", products);
        socket.emit("product", products);
      });

    socket.on("new-product", (product) => {
      const { title, price, url } = product;
      if (title == "" || price == "" || url == "") {
        console.log("el formulario esta vacio");
      } else {
        knex("product")
          .insert(product)
          .then(() => console.log("product agregado"));
      }
    });
  });
};

module.exports = socketsEventsProduct;
