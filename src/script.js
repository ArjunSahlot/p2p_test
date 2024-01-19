let currentConnection = null;
let peer = null;

function initializePeer() {
    peer = new Peer();

    peer.on("open", (id) => {
        console.log(`My peer ID is: ${id}`);
        document.getElementById("cid").innerHTML = id;
    });

    peer.on("connection", (connection) => {
        console.log("Connection received");
        setupConnectionHandler(connection);
    });
}

document.getElementById("create").addEventListener("click", initializePeer);

document.getElementById("join").addEventListener("click", () => {
    if (!peer) {
        initializePeer();
    }

    const otherid = document.getElementById("inp").value;
    if (!otherid) {
        alert("Please enter an ID to connect to");
        return;
    }

    const connection = peer.connect(otherid);
    console.log(`Sent connection to ${otherid}`);

    setupConnectionHandler(connection);
});

function setupConnectionHandler(conn) {
    currentConnection = conn;

    conn.on("open", () => {
        console.log("Connection established.");
    });

    // Receive messages
    conn.on("data", (data) => {
        console.log("Received:", data);
        alert(data);
    });
}

document.getElementById("send").addEventListener("click", () => {
    if (currentConnection?.open) {
        const data = prompt("Enter message to send", "Hello World");
        currentConnection.send(data);
    } else {
        console.log("No active connection.");
    }
});

