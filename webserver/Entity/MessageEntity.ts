/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />

import * as Mongoose from "mongoose";
import {IMessage} from "../Domain/Message"

export interface IMessage {
    driver: boolean;
    time: string;
    name: string;
    place: string;
}

export interface IMessageModel extends IMessage, Mongoose.Document {
};

var messageSchema = new Mongoose.Schema({
    driver: Boolean,
    time: String,
    name: String,
    place: String
});

// ReSharper disable once InconsistentNaming
export var MessageEntity = Mongoose.model<IMessageModel>("Message", messageSchema);
