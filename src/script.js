console.log("creating connection");
let peer = new Peer();
console.log("created connection" + peer.id);

document.getElementById("create").addEventListener("click", () => {
    console.log("creating connection");
    peer = new Peer();
    peer.on("open", (id) => {
        document.getElementById("cid").innerHTML = id;
        console.log("created connection" + id);
    });
});

document.getElementById("join").addEventListener("click", () => {
    console.log("connecting");
    console.log(document.getElementById("inp").value);
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
