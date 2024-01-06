let peer = new Peer();

document.getElementById("create").addEventListener("click", () => {
    peer = new Peer();
    peer.on("open", (id) => {
        document.getElementById("cid").innerHTML = id;
    });
});

document.getElementById("join").addEventListener("click", () => {
    console.log("connecting");
    peer.connect(document.getElementById("inp").value);
    console.log("sent connection");
});

peer.on("connection", (conn) => {
    console.log("received connection");
    conn.on("open", () => {
        console.log("sending data");
        conn.send("from " + peer.id);
        console.log("sent data");

        conn.on("data", (data) => {
            console.log("received data");
            console.log(data);
        });
    });
});
