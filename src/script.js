document.getElementById("create").addEventListener("click", () => {
    const peer = new Peer();

    peer.on("open", (id) => {
        console.log(`My peer ID is: ${id}`);
        document.getElementById("cid").innerHTML = id;
    });

    peer.on("connection", (connection) => {
        console.log("Connection received");
        setupConnectionHandler(connection);
    });
});

document.getElementById("join").addEventListener("click", () => {
    const otherid = document.getElementById("inp").value;
    if (!otherid) {
        alert("Please enter an ID to conect to");
        return;
    }

    const peer = new Peer();
    const connection = peer.connect(otherid);
    console.log(`Sent connection to ${otherid}`);

    setupConnectionHandler(connection);
});

function setupConnectionHandler(conn) {
    currentConnection = conn;

    conn.on('open', () => {
        console.log('Connection established.');
    });

    // Receive messages
    conn.on('data', (data) => {
        console.log('Received:', data);
    });
}

