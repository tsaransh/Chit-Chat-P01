package com.app.chitchat.controller;

import com.app.chitchat.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message message(@RequestBody Message message) {
//        System.err.println("request received");
//        try {
//            Thread.sleep(20000);
//        } catch(InterruptedException exception) {
//            exception.printStackTrace();
//        }
        return message;
    }

}
