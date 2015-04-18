//
//  Replies.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import JSONJoy


struct Reply : JSONJoy {
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


struct Replies : JSONJoy {
    var replies: Array<Reply>?
    init() {
    }
    init(_ decoder: JSONDecoder) {
        //we check if the array is valid then alloc our array and loop through it, creating the new address objects.
        if let addrs = decoder["list"].array {
            replies = Array<Reply>()
            for addrDecoder in addrs {
                replies?.append(Reply(addrDecoder))
            }
        }
    }
}