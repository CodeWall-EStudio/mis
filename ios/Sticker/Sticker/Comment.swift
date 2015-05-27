//
//  Comment.swift
//  Sticker
//
//  Created by Joey Chow on 5/22/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import JSONJoy

/*
"id": 50,
"title": "",
"content": "tttt",
"creator": 1,
"createTime": "2015-04-19T01:35:36.000Z",
"updateTime": "2015-04-19T01:35:36.000Z",
"article_id": 107,
"subject_id": 63,
"updator": 1,
"creatorName": "龙福康"
*/

struct Comment : JSONJoy {
    var id: Int?
    var title: String?
    var content: String?
    var creator: Int?
    var creatorName: String?
    var createTime: String?
    var updateTime: String?
    var updator: Int?
    var subject_id: Int?
    var article_id: Int?
    
    init() {
        
    }
    init(_ decoder: JSONDecoder) {
        id = decoder["id"].integer
        subject_id = decoder["subject_id"].integer
        creator = decoder["creator"].integer
        updator = decoder["updator"].integer
        article_id = decoder["article_id"].integer
        
        title = decoder["title"].string
        content = decoder["content"].string
        createTime = decoder["createTime"].string
        updateTime = decoder["updateTime"].string
        creatorName = decoder["creatorName"].string
        
    }
}


struct Comments : JSONJoy {
    var comments: Array<Comment>?
    init() {
    }
    init(_ decoder: JSONDecoder) {
        //we check if the array is valid then alloc our array and loop through it, creating the new address objects.
        if let addrs = decoder["list"].array {
            comments = Array<Comment>()
            for addrDecoder in addrs {
                comments?.append(Comment(addrDecoder))
            }
        }
    }
}