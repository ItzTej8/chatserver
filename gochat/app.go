package main

import (
    "log"
    "net/http"

    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func echo(w http.ResponseWriter, r *http.Request) {
    // Upgrade the HTTP connection to a WebSocket connection
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()

    for {
        // Read message from the WebSocket connection
        messageType, message, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }

        // Print the received message to the console
        log.Printf("Received message: %s", message)

        // Echo the message back to the client
        if err := conn.WriteMessage(messageType, message); err != nil {
            log.Println(err)
            return
        }
    }
}

func main() {
    // Serve the echo handler on the /echo route
    http.HandleFunc("/echo", echo)

    // Start the HTTP server on port 8080
    log.Println("Server started on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
