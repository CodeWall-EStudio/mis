//
//  User.swift
//  StickerX
//
//  Created by Joey Chow on 4/11/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation

class User {
    
    var id: Int
    var uid: String
    var name: String
    var auth: Int
    var sid: String
    
    init(id: Int, uid: String, name: String, auth: Int, sid: String) {
        self.id = id
        self.uid = uid
        self.name = name
        self.auth = auth
        self.sid = sid
    }
    
}