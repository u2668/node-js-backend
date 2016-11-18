/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';

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

export var Message = Mongoose.model<IMessageModel>("Message", messageSchema);
