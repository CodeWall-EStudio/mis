//
//  StickerViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/11/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP

class StickerViewController: UIViewController {
    
    struct Constants {
        static let green: UIColor = UIColor(red: 0.102, green: 0.737, blue: 0.612, alpha: 1)
        static let gray: UIColor = UIColor(red: 0.925, green: 0.941, blue: 0.945, alpha: 1)
        static let radius: CGFloat = 4.5
    }
    
    // used for keyboard action
    var withKeyboard = false
    var activeTextField: UITextField?
    
    // user info
    var user: User?
    
    // nsoperation
    var operationQueue: NSOperationQueue?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        // add keyboard observer
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        
        // if keyboard, register notification
        if (withKeyboard) {
            registerKeyboardNotifications()
        }
    }
    
    override func viewDidDisappear(animated: Bool) {
        super.viewWillDisappear(animated)
        
        // if keyboard, remove notification
        if (withKeyboard) {
            NSNotificationCenter.defaultCenter().removeObserver(self)
        }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    // Call this method somewhere in your view controller setup code.
    func registerKeyboardNotifications() {
        let notificationCenter = NSNotificationCenter.defaultCenter()
        notificationCenter.addObserver(self,
            selector: "keyboardWillBeShown:",
            name: UIKeyboardWillShowNotification,
            object: nil)
        notificationCenter.addObserver(self,
            selector: "keyboardWillBeHidden:",
            name: UIKeyboardWillHideNotification,
            object: nil)
    }
    
    // Called when the UIKeyboardDidShowNotification is sent.
    func keyboardWillBeShown(sender: NSNotification) {
        let info: NSDictionary = sender.userInfo!
        let value: NSValue = info.valueForKey(UIKeyboardFrameBeginUserInfoKey) as! NSValue
        let keyboardSize: CGSize = value.CGRectValue().size
        
        let viewHeight = self.view.frame.height
        let activeTextFieldRect: CGRect? = activeTextField?.frame
        let activeTextFieldHeight: CGFloat? = activeTextFieldRect?.height
        let activeTextFieldOrigin: CGPoint? = activeTextFieldRect?.origin
        let activeTextFieldOriginY: CGFloat? = activeTextFieldOrigin?.y
        let minusValue = viewHeight/2 - activeTextFieldOriginY! - activeTextFieldHeight!/2 - keyboardSize.height
        
        if (minusValue < 0) {
            UIView.animateWithDuration(0.5, animations: {self.view.frame.origin.y = minusValue
            })
        }
    }
    
    // Called when the UIKeyboardWillHideNotification is sent
    func keyboardWillBeHidden(sender: NSNotification) {
        view.frame.origin.y = 0
    }
    
    // change UITextField status
    func changeTextFieldStatus(status: Bool) {
        // set Style
        if (status) {
            activeTextField!.layer.borderWidth = 1
            activeTextField!.layer.borderColor = Constants.green.CGColor
            activeTextField!.layer.cornerRadius = 4.5
            
        } else {
            activeTextField!.layer.borderWidth = 0
        }
    }
    
    // hide keyboard
    func hideKeyboard() {
        if ((activeTextField) != nil) {
            activeTextField?.resignFirstResponder()
        }
    }
    
    // Beautify UIView
    func beautifyUIView(view: UIView, cornerRadius: CGFloat, backgroundColor: UIColor) {
        view.layer.cornerRadius = cornerRadius
        view.backgroundColor = backgroundColor
    }
    
    // http post
    func postHTTP(uri: String, params: Dictionary<String, AnyObject>, success: (response: HTTPResponse) -> Void, failure: (error: NSError, response: HTTPResponse?) -> Void) {
        //create an queue.
        if (operationQueue == nil) {
            operationQueue = NSOperationQueue()
            operationQueue!.maxConcurrentOperationCount = 2
        }
        //create an HTTPTask
        var request = HTTPTask()
        if let sid = STUser.shared.sid {
            request.requestSerializer = HTTPRequestSerializer()
            request.requestSerializer.headers["Cookie"] = "sid=\"\(sid)\""
        }
        request.responseSerializer = JSONResponseSerializer()
        //using the create method, an HTTPOperation is returned.
        var opt = request.create(
            uri,
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
            operationQueue!.addOperation(opt!)
        }
        
    }
    
    // http get
    func getHTTP(uri: String, success: (response: HTTPResponse) -> Void, failure: (error: NSError, response: HTTPResponse?) -> Void) {
        //create an queue.
        if (operationQueue == nil) {
            operationQueue = NSOperationQueue()
            operationQueue!.maxConcurrentOperationCount = 2
        }
        //create an HTTPTask
        var request = HTTPTask()
        if let sid = STUser.shared.sid {
            request.requestSerializer = HTTPRequestSerializer()
            request.requestSerializer.headers["Cookie"] = "sid=\"\(sid)\""
        }
        request.responseSerializer = JSONResponseSerializer()
        //using the create method, an HTTPOperation is returned.
        var opt = request.create(
            uri,
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
            operationQueue!.addOperation(opt!)
        }
        
    }

    // user storage
    func getUser() {
        
    }
    
    func setUser() {
        
    }
}
