var stompClient = null;

function connect() {
    let socket = new SockJS("/server1")
    stompClient = Stomp.over(socket)
    stompClient.connect({}, function(frame){
        console.log("connected: "+frame);
        $("#name-form").addClass('d-none')
        $("#chat-room").removeClass('d-none')

        // subscribe
        stompClient.subscribe("/topic/return-to", function(response){
            showMessage(JSON.parse(response.body))
        })
    })
}

function showMessage(message) {
    $("#message-container-table").prepend(`<tr><td><b>${message.senderName}: </b>${message.messageContent}</td></tr>`)
}

function sendMessage() {
    let jsonOb = {
        senderName: localStorage.getItem("name"),
        messageContent: $("#message-value").val()
    }
    stompClient.send("/app/message",{},JSON.stringify(jsonOb))
}

$(document).ready((e)=>{
    $("#login").click(()=> {
        let name = $("#name-value").val()
        localStorage.setItem("name",name)
        connect();
    })
    $("#send").click(()=> {
        sendMessage()
    })
})
