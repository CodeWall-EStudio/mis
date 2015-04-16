//
//  Subjects.swift
//  StickerX
//
//  Created by Joey Chow on 4/15/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import JSONJoy

struct Subject : JSONJoy {
    var id: Int?
    var title: String?
    var priv: Int?
    var guest: Int?
    var mark: String?
    var creator: Int?
    var createTime: String?
    var updateTime: String?
    var updator: Int?
    var isArchive: Int?
    var creatorName: String?
    var memberCount: Int?
    var resourceCount: Int?
    
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
        
        title = decoder["title"].string
        mark = decoder["mark"].string
        createTime = decoder["createTime"].string
        updateTime = decoder["updateTime"].string
        creatorName = decoder["creatorName"].string
        
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