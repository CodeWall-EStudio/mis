//
//  HTTP.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import SwiftHTTP

private let sharedInstance = HTTP()

class HTTP  {
    class var shared : HTTP {
        return sharedInstance
    }
    
    var operationQueue : NSOperationQueue
    var sid : String
    
    init() {
        operationQueue = NSOperationQueue()
        operationQueue.maxConcurrentOperationCount = 100
        sid = ""
    }
    
    // http post
    class func post(url: String, params: Dictionary<String, AnyObject>, success: (response: HTTPResponse) -> Void, failure: (error: NSError, response: HTTPResponse?) -> Void) {
        //create an HTTPTask
        var request = HTTPTask()
        if shared.sid != "" {
            request.requestSerializer = HTTPRequestSerializer()
            request.requestSerializer.headers["Cookie"] = "sid=\"\(shared.sid)\""
        }
        request.responseSerializer = JSONResponseSerializer()
        //using the create method, an HTTPOperation is returned.
        var opt = request.create(
            url,
            method: .POST,
            parameters: params,
            success: {(response: HTTPResponse) -> Void in
                success(response: response)
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                failure(error: error, response: response)
            }
        )
        //To start the request, we simply add it to our queue
        if opt != nil {
            shared.operationQueue.addOperation(opt!)
        }
        
    }
    
    // http get
    class func get(url: String, success: (response: HTTPResponse) -> Void, failure: (error: NSError, response: HTTPResponse?) -> Void) {
        //create an HTTPTask
        var request = HTTPTask()
        if shared.sid != "" {
            request.requestSerializer = HTTPRequestSerializer()
            request.requestSerializer.headers["Cookie"] = "sid=\"\(shared.sid)\""
        }
        request.responseSerializer = JSONResponseSerializer()
        //using the create method, an HTTPOperation is returned.
        var opt = request.create(
            url,
            method: .GET,
            parameters: nil,
            success: {(response: HTTPResponse) -> Void in
                success(response: response)
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                failure(error: error, response: response)
            }
        )
        //To start the request, we simply add it to our queue
        if opt != nil {
            shared.operationQueue.addOperation(opt!)
        }
        
    }
    
    class func format(headers: Dictionary<String,String>) -> String {
        var cookies: [String]
        var values: [String]
        for (key, value) in headers {
            if (key == "Set-Cookie") {
                cookies = value.componentsSeparatedByString(";")
                for str in cookies {
                    values = str.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceCharacterSet()).componentsSeparatedByString("=")
                    if (values.count > 1) {
                        if (values[0] == "sid") {
                            return values[1]
                        }
                    }
                }
            }
        }
        return ""
    }
}

