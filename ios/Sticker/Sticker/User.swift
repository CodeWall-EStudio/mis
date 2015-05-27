//
//  User.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation

class User {
    
    var id: Int
    var uid: String
    var name: String
    var auth: Int
    
    init(id: Int, uid: String, name: String, auth: Int) {
        self.id = id
        self.uid = uid
        self.name = name
        self.auth = auth
    }
    
}