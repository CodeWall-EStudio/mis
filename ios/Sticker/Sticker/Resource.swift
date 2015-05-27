//
//  Resource.swift
//  Sticker
//
//  Created by Joey Chow on 5/21/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import JSONJoy

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