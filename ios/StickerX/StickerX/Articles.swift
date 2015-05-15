//
//  articles.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation

import JSONJoy

/*
"id": 2,
"title": "这是标题啊",
"content": "内容主体",
"creator": 1,
"createTime": "2015-03-12T01:32:49.000Z",
"updator": 1,
"updateTime": "2015-04-07T22:45:49.000Z",
"subject_id": 1,
"status": 0,
"creatorName": "龙福康",
"updatorName": "龙福康",
"isStar": 1,
"isCollect": 1,
*/

struct Article : JSONJoy {
    var id: Int?
    var title: String?
    var content: String?
    var creator: Int?
    var creatorName: String?
    var createTime: String?
    var updateTime: String?
    var updator: Int?
    var updatorName: String?
    var subject_id: Int?
    var status: Int?
    var isStar: Int?
    var isCollect: Int?
    
    init() {
        
    }
    init(_ decoder: JSONDecoder) {
        id = decoder["id"].integer
        subject_id = decoder["subject_id"].integer
        creator = decoder["creator"].integer
        updator = decoder["updator"].integer
        status = decoder["status"].integer
        isStar = decoder["isStar"].integer
        isCollect = decoder["isCollect"].integer
        
        title = decoder["title"].string
        content = decoder["content"].string
        createTime = decoder["createTime"].string
        updateTime = decoder["updateTime"].string
        creatorName = decoder["creatorName"].string
        updatorName = decoder["updatorName"].string
        
    }
}

struct Articles : JSONJoy {
    var articles: Array<Article>?
    init() {
    }
    init(_ decoder: JSONDecoder) {
        //we check if the array is valid then alloc our array and loop through it, creating the new address objects.
        if let addrs = decoder["list"].array {
            articles = Array<Article>()
            for addrDecoder in addrs {
                articles?.append(Article(addrDecoder))
            }
        }
    }
}

struct Resource : JSONJoy {
    var id: Int?
    init() {
        
    }
    init(_ decoder: JSONDecoder) {
        id = decoder["id"].integer
    }
}

struct Resources : JSONJoy {
    var resources: Array<Resource>?
    init() {
    }
    init(_ decoder: JSONDecoder) {
        //we check if the array is valid then alloc our array and loop through it, creating the new address objects.
        if let addrs = decoder["list"].array {
            resources = Array<Resource>()
            for addrDecoder in addrs {
                resources?.append(Resource(addrDecoder))
            }
        }
    }
}