//
//  Config.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation

private let sharedInstance = Config()

class Config  {
    class var shared : Config {
        return sharedInstance
    }
    
    let servers = [
        Server(title: "自由小学[开发环境 - mis.codewalle.com]", domain: "mis.codewalle.com"),
        Server(title: "朝阳小学[测试环境 - media-test.hylc-edu.cn]", domain: "media-test.hylc-edu.cn")
    ]
    
    var server : String = ""
    
    var user : User = User(id: 0, uid: "", name: "", auth: 0)
    
    var subjectId = 0
    
    var articleId = 0
}