let peer = new Peer();

document.getElementById("create").addEventListener("click", () => {
    peer = new Peer();
    peer.on("open", (id) => {
        document.getElementById("cid").innerHTML = id;
    });
});

document.getElementById("join").addEventListener("click", () => {
    peer.connect(document.getElementById("inp").value);
    
});

peer.on("connection", (conn) => {
    conn.on("open", () => {
        conn.send("from " + peer.id);

        conn.on("data", (data) => {
            console.log(data);
        });
    });
});
