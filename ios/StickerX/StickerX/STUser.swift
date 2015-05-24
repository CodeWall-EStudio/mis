//
//  STUser.swift
//  StickerX
//
//  Created by Joey Chow on 4/14/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation

class STUser {
    class var shared: STUser {
        return Inner.instance
    }
    
    struct Inner {
        static let instance = STUser()
    }
    
    var user: User?
    var sid: String?
    var selectedSubjectId: Int?
    var selectedArticleId: Int?
    var server: String?
}