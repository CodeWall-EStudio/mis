//
//  Subjectx.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import JSONJoy

/*
"id": 10,
"title": "测试主题2",
"private": 1,
"guest": 0,
"mark": "测试",
"creator": 1,
"createTime": "2015-03-11T22:17:49.000Z",
"updateTime": "2015-04-11T15:53:22.000Z",
"updator": 4,
"isArchive": 0,
"creatorName": "龙福康",
"memberCount": 0,
"follow": 0,
"articleCount": 0,
"articleResourceCount": 0,
"articleCreateCount": 0,
"labels": [ ],
"subjectResourceCount": 0,
"resourceList": [ ]
*/

struct Subjectx : JSONJoy {
    var id: Int?
    var title: String?
    var priv: Int?
    var guest: Int?
    var mark: String?
    var creator: Int?
    var creatorName: String?
    var createTime: String?
    var updateTime: String?
    var updator: Int?
    var isArchive: Int?
    var memberCount: Int?
    var articleCount: Int?
    
    init() {
        
    }
    init(_ decoder: JSONDecoder) {
        id = decoder["id"].integer
        priv = decoder["private"].integer
        guest = decoder["guest"].integer
        creator = decoder["creator"].integer
        updator = decoder["updator"].integer
        isArchive = decoder["isArchive"].integer
        memberCount = decoder["memberCount"].integer
        articleCount = decoder["articleCount"].integer
        
        title = decoder["title"].string
        mark = decoder["mark"].string
        createTime = decoder["createTime"].string
        updateTime = decoder["updateTime"].string
        creatorName = decoder["creatorName"].string
        
    }
}
