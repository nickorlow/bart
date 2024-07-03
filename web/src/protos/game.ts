/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 4.25.3
 * source: game.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export class FrameThrowState extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        is_standing: boolean[];
        pins_standing: number;
        foul: boolean;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            this.is_standing = data.is_standing;
            this.pins_standing = data.pins_standing;
            this.foul = data.foul;
        }
    }
    get is_standing() {
        return pb_1.Message.getFieldWithDefault(this, 1, []) as boolean[];
    }
    set is_standing(value: boolean[]) {
        pb_1.Message.setField(this, 1, value);
    }
    get pins_standing() {
        return pb_1.Message.getField(this, 2) as number;
    }
    set pins_standing(value: number) {
        pb_1.Message.setField(this, 2, value);
    }
    get has_pins_standing() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get foul() {
        return pb_1.Message.getField(this, 3) as boolean;
    }
    set foul(value: boolean) {
        pb_1.Message.setField(this, 3, value);
    }
    get has_foul() {
        return pb_1.Message.getField(this, 3) != null;
    }
    static fromObject(data: {
        is_standing: boolean[];
        pins_standing?: number;
        foul?: boolean;
    }): FrameThrowState {
        const message = new FrameThrowState({
            is_standing: data.is_standing,
            pins_standing: data.pins_standing,
            foul: data.foul
        });
        return message;
    }
    toObject() {
        const data: {
            is_standing: boolean[];
            pins_standing?: number;
            foul?: boolean;
        } = {
            is_standing: this.is_standing
        };
        if (this.pins_standing != null) {
            data.pins_standing = this.pins_standing;
        }
        if (this.foul != null) {
            data.foul = this.foul;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.is_standing.length)
            writer.writeRepeatedBool(1, this.is_standing);
        if (this.has_pins_standing)
            writer.writeUint32(2, this.pins_standing);
        if (this.has_foul)
            writer.writeBool(3, this.foul);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FrameThrowState {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FrameThrowState();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    pb_1.Message.addToRepeatedField(message, 1, reader.readBool());
                    break;
                case 2:
                    message.pins_standing = reader.readUint32();
                    break;
                case 3:
                    message.foul = reader.readBool();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): FrameThrowState {
        return FrameThrowState.deserialize(bytes);
    }
}
export class Frame extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        frame_number: number;
        first_throw: FrameThrowState;
        second_throw: FrameThrowState;
        third_throw?: FrameThrowState;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            this.frame_number = data.frame_number;
            this.first_throw = data.first_throw;
            this.second_throw = data.second_throw;
            if ("third_throw" in data && data.third_throw != undefined) {
                this.third_throw = data.third_throw;
            }
        }
    }
    get frame_number() {
        return pb_1.Message.getField(this, 1) as number;
    }
    set frame_number(value: number) {
        pb_1.Message.setField(this, 1, value);
    }
    get has_frame_number() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get first_throw() {
        return pb_1.Message.getWrapperField(this, FrameThrowState, 2) as FrameThrowState;
    }
    set first_throw(value: FrameThrowState) {
        pb_1.Message.setWrapperField(this, 2, value);
    }
    get has_first_throw() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get second_throw() {
        return pb_1.Message.getWrapperField(this, FrameThrowState, 3) as FrameThrowState;
    }
    set second_throw(value: FrameThrowState) {
        pb_1.Message.setWrapperField(this, 3, value);
    }
    get has_second_throw() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get third_throw() {
        return pb_1.Message.getWrapperField(this, FrameThrowState, 4) as FrameThrowState;
    }
    set third_throw(value: FrameThrowState) {
        pb_1.Message.setWrapperField(this, 4, value);
    }
    get has_third_throw() {
        return pb_1.Message.getField(this, 4) != null;
    }
    static fromObject(data: {
        frame_number?: number;
        first_throw?: ReturnType<typeof FrameThrowState.prototype.toObject>;
        second_throw?: ReturnType<typeof FrameThrowState.prototype.toObject>;
        third_throw?: ReturnType<typeof FrameThrowState.prototype.toObject>;
    }): Frame {
        const message = new Frame({
            frame_number: data.frame_number,
            first_throw: FrameThrowState.fromObject(data.first_throw),
            second_throw: FrameThrowState.fromObject(data.second_throw)
        });
        if (data.third_throw != null) {
            message.third_throw = FrameThrowState.fromObject(data.third_throw);
        }
        return message;
    }
    toObject() {
        const data: {
            frame_number?: number;
            first_throw?: ReturnType<typeof FrameThrowState.prototype.toObject>;
            second_throw?: ReturnType<typeof FrameThrowState.prototype.toObject>;
            third_throw?: ReturnType<typeof FrameThrowState.prototype.toObject>;
        } = {};
        if (this.frame_number != null) {
            data.frame_number = this.frame_number;
        }
        if (this.first_throw != null) {
            data.first_throw = this.first_throw.toObject();
        }
        if (this.second_throw != null) {
            data.second_throw = this.second_throw.toObject();
        }
        if (this.third_throw != null) {
            data.third_throw = this.third_throw.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_frame_number)
            writer.writeUint32(1, this.frame_number);
        if (this.has_first_throw)
            writer.writeMessage(2, this.first_throw, () => this.first_throw.serialize(writer));
        if (this.has_second_throw)
            writer.writeMessage(3, this.second_throw, () => this.second_throw.serialize(writer));
        if (this.has_third_throw)
            writer.writeMessage(4, this.third_throw, () => this.third_throw.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Frame {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Frame();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.frame_number = reader.readUint32();
                    break;
                case 2:
                    reader.readMessage(message.first_throw, () => message.first_throw = FrameThrowState.deserialize(reader));
                    break;
                case 3:
                    reader.readMessage(message.second_throw, () => message.second_throw = FrameThrowState.deserialize(reader));
                    break;
                case 4:
                    reader.readMessage(message.third_throw, () => message.third_throw = FrameThrowState.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Frame {
        return Frame.deserialize(bytes);
    }
}
export class BowlerGame extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        bowler: string;
        frames: Frame[];
        score: number;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            this.bowler = data.bowler;
            this.frames = data.frames;
            this.score = data.score;
        }
    }
    get bowler() {
        return pb_1.Message.getField(this, 1) as string;
    }
    set bowler(value: string) {
        pb_1.Message.setField(this, 1, value);
    }
    get has_bowler() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get frames() {
        return pb_1.Message.getRepeatedWrapperField(this, Frame, 2) as Frame[];
    }
    set frames(value: Frame[]) {
        pb_1.Message.setRepeatedWrapperField(this, 2, value);
    }
    get score() {
        return pb_1.Message.getField(this, 3) as number;
    }
    set score(value: number) {
        pb_1.Message.setField(this, 3, value);
    }
    get has_score() {
        return pb_1.Message.getField(this, 3) != null;
    }
    static fromObject(data: {
        bowler?: string;
        frames?: ReturnType<typeof Frame.prototype.toObject>[];
        score?: number;
    }): BowlerGame {
        const message = new BowlerGame({
            bowler: data.bowler,
            frames: data.frames.map(item => Frame.fromObject(item)),
            score: data.score
        });
        return message;
    }
    toObject() {
        const data: {
            bowler?: string;
            frames?: ReturnType<typeof Frame.prototype.toObject>[];
            score?: number;
        } = {};
        if (this.bowler != null) {
            data.bowler = this.bowler;
        }
        if (this.frames != null) {
            data.frames = this.frames.map((item: Frame) => item.toObject());
        }
        if (this.score != null) {
            data.score = this.score;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_bowler && this.bowler.length)
            writer.writeString(1, this.bowler);
        if (this.frames.length)
            writer.writeRepeatedMessage(2, this.frames, (item: Frame) => item.serialize(writer));
        if (this.has_score)
            writer.writeUint32(3, this.score);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BowlerGame {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BowlerGame();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.bowler = reader.readString();
                    break;
                case 2:
                    reader.readMessage(message.frames, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Frame.deserialize(reader), Frame));
                    break;
                case 3:
                    message.score = reader.readUint32();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): BowlerGame {
        return BowlerGame.deserialize(bytes);
    }
}
export class Game extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        id: number;
        time_played: number;
        alley: string;
        bowler_games: BowlerGame[];
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            this.id = data.id;
            this.time_played = data.time_played;
            this.alley = data.alley;
            this.bowler_games = data.bowler_games;
        }
    }
    get id() {
        return pb_1.Message.getField(this, 1) as number;
    }
    set id(value: number) {
        pb_1.Message.setField(this, 1, value);
    }
    get has_id() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get time_played() {
        return pb_1.Message.getField(this, 2) as number;
    }
    set time_played(value: number) {
        pb_1.Message.setField(this, 2, value);
    }
    get has_time_played() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get alley() {
        return pb_1.Message.getField(this, 3) as string;
    }
    set alley(value: string) {
        pb_1.Message.setField(this, 3, value);
    }
    get has_alley() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get bowler_games() {
        return pb_1.Message.getRepeatedWrapperField(this, BowlerGame, 4) as BowlerGame[];
    }
    set bowler_games(value: BowlerGame[]) {
        pb_1.Message.setRepeatedWrapperField(this, 4, value);
    }
    static fromObject(data: {
        id?: number;
        time_played?: number;
        alley?: string;
        bowler_games?: ReturnType<typeof BowlerGame.prototype.toObject>[];
    }): Game {
        const message = new Game({
            id: data.id,
            time_played: data.time_played,
            alley: data.alley,
            bowler_games: data.bowler_games.map(item => BowlerGame.fromObject(item))
        });
        return message;
    }
    toObject() {
        const data: {
            id?: number;
            time_played?: number;
            alley?: string;
            bowler_games?: ReturnType<typeof BowlerGame.prototype.toObject>[];
        } = {};
        if (this.id != null) {
            data.id = this.id;
        }
        if (this.time_played != null) {
            data.time_played = this.time_played;
        }
        if (this.alley != null) {
            data.alley = this.alley;
        }
        if (this.bowler_games != null) {
            data.bowler_games = this.bowler_games.map((item: BowlerGame) => item.toObject());
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_id)
            writer.writeUint64(1, this.id);
        if (this.has_time_played)
            writer.writeUint64(2, this.time_played);
        if (this.has_alley && this.alley.length)
            writer.writeString(3, this.alley);
        if (this.bowler_games.length)
            writer.writeRepeatedMessage(4, this.bowler_games, (item: BowlerGame) => item.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Game {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Game();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.id = reader.readUint64();
                    break;
                case 2:
                    message.time_played = reader.readUint64();
                    break;
                case 3:
                    message.alley = reader.readString();
                    break;
                case 4:
                    reader.readMessage(message.bowler_games, () => pb_1.Message.addToRepeatedWrapperField(message, 4, BowlerGame.deserialize(reader), BowlerGame));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Game {
        return Game.deserialize(bytes);
    }
}
export class Alley extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        id: number;
        name: string;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            this.id = data.id;
            this.name = data.name;
        }
    }
    get id() {
        return pb_1.Message.getField(this, 1) as number;
    }
    set id(value: number) {
        pb_1.Message.setField(this, 1, value);
    }
    get has_id() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get name() {
        return pb_1.Message.getField(this, 2) as string;
    }
    set name(value: string) {
        pb_1.Message.setField(this, 2, value);
    }
    get has_name() {
        return pb_1.Message.getField(this, 2) != null;
    }
    static fromObject(data: {
        id?: number;
        name?: string;
    }): Alley {
        const message = new Alley({
            id: data.id,
            name: data.name
        });
        return message;
    }
    toObject() {
        const data: {
            id?: number;
            name?: string;
        } = {};
        if (this.id != null) {
            data.id = this.id;
        }
        if (this.name != null) {
            data.name = this.name;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_id)
            writer.writeUint64(1, this.id);
        if (this.has_name && this.name.length)
            writer.writeString(2, this.name);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Alley {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Alley();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.id = reader.readUint64();
                    break;
                case 2:
                    message.name = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Alley {
        return Alley.deserialize(bytes);
    }
}
export class Bowler extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        id: number;
        name: string;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            this.id = data.id;
            this.name = data.name;
        }
    }
    get id() {
        return pb_1.Message.getField(this, 1) as number;
    }
    set id(value: number) {
        pb_1.Message.setField(this, 1, value);
    }
    get has_id() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get name() {
        return pb_1.Message.getField(this, 2) as string;
    }
    set name(value: string) {
        pb_1.Message.setField(this, 2, value);
    }
    get has_name() {
        return pb_1.Message.getField(this, 2) != null;
    }
    static fromObject(data: {
        id?: number;
        name?: string;
    }): Bowler {
        const message = new Bowler({
            id: data.id,
            name: data.name
        });
        return message;
    }
    toObject() {
        const data: {
            id?: number;
            name?: string;
        } = {};
        if (this.id != null) {
            data.id = this.id;
        }
        if (this.name != null) {
            data.name = this.name;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_id)
            writer.writeUint64(1, this.id);
        if (this.has_name && this.name.length)
            writer.writeString(2, this.name);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Bowler {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Bowler();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.id = reader.readUint64();
                    break;
                case 2:
                    message.name = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Bowler {
        return Bowler.deserialize(bytes);
    }
}
