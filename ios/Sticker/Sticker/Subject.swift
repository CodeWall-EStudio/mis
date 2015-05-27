//
//  Subject.swift
//  Sticker
//
//  Created by Joey Chow on 5/19/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import JSONJoy

/*
"id": 49,
"title": "c1",
"private": 0,
"guest": 0,
"mark": "第一个主题",
"creator": 4,
"createTime": "2015-04-26T05:04:46.000Z",
"updateTime": "2015-04-26T05:04:46.000Z",
"updator": 4,
"isArchive": 0,
"creatorName": "3",
"memberCount": 0,
"updatorName": "3",
"resourceCount": 0,
"articleCount": 0
*/

struct Subject : JSONJoy {
    var id: Int?
    var title: String?
    var priv: Int?
    var guest: Int?
    var mark: String?
    var creator: Int?
    var creatorName: String?
    var createTime: String?
    var updator: Int?
    var updateTime: String?
    var updatorName: String?
    var isArchive: Int?
    var memberCount: Int?
    var resourceCount: Int?
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
        resourceCount = decoder["resourceCount"].integer
        articleCount = decoder["articleCount"].integer
        
        title = decoder["title"].string
        mark = decoder["mark"].string
        createTime = decoder["createTime"].string
        updateTime = decoder["updateTime"].string
        creatorName = decoder["creatorName"].string
        updatorName = decoder["updatorName"].string
        
    }
}


struct Subjects : JSONJoy {
    var subjects: Array<Subject>?
    init() {
    }
    init(_ decoder: JSONDecoder) {
        //we check if the array is valid then alloc our array and loop through it, creating the new address objects.
        if let addrs = decoder["list"].array {
            subjects = Array<Subject>()
            for addrDecoder in addrs {
                subjects?.append(Subject(addrDecoder))
            }
        }
    }
}


/*
"id": 49,
"title": "c1",
"private": 0,
"guest": 0,
"mark": "第一个主题",
"creator": 4,
"createTime": "2015-04-26T05:04:46.000Z",
"updateTime": "2015-04-26T05:04:46.000Z",
"updator": 4,
"isArchive": 0,
"creatorName": "3",
"memberCount": 0,
"updatorName": "3",
"follow": 0,
"articleCount": 0,
"articleResourceCount": 0,
"articleCreateCount": 0,
"labels": [ ],
"subjectResourceCount": 0,
"resourceList": [ ]
*/
struct SubjectDetail : JSONJoy {
    var id: Int?
    var title: String?
    var priv: Int?
    var guest: Int?
    var mark: String?
    var creator: Int?
    var creatorName: String?
    var createTime: String?
    var updator: Int?
    var updateTime: String?
    var updatorName: String?
    var isArchive: Int?
    var memberCount: Int?
    var subjectResourceCount: Int?
    var articleCount: Int?
    var articleResourceCount: Int?
    var articleCreateCount: Int?
    var follow: Int?
    
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
        subjectResourceCount = decoder["subjectResourceCount"].integer
        articleCount = decoder["articleCount"].integer
        articleResourceCount = decoder["articleResourceCount"].integer
        articleCreateCount = decoder["articleCreateCount"].integer
        follow = decoder["follow"].integer
        
        title = decoder["title"].string
        mark = decoder["mark"].string
        createTime = decoder["createTime"].string
        updateTime = decoder["updateTime"].string
        creatorName = decoder["creatorName"].string
        updatorName = decoder["updatorName"].string
        
    }
}
