//
//  LoginViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/10/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class LoginViewController: StickerViewController {
    
    @IBOutlet weak var loginView: UIView!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var errMsgLabel: UILabel!
    @IBOutlet weak var uidTextField: UITextField!
    @IBOutlet weak var pwdTextField: UITextField!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    @IBAction func editDidBegin(sender: AnyObject) {
        errMsgLabel.text = ""
        activeTextField = sender as? UITextField
        changeTextFieldStatus(true)
    }
    @IBAction func editDidEnd(sender: AnyObject) {
        activeTextField = sender as? UITextField
        changeTextFieldStatus(false)
        activeTextField = nil
    }
    @IBAction func didEndOnExit(sender: AnyObject) {
        switch (sender.tag) {
        case 1:
            pwdTextField.becomeFirstResponder()
        case 2:
            sender.resignFirstResponder()
            loginButton.sendActionsForControlEvents(UIControlEvents.TouchDown)
        default:
            println()
        }
    }
    @IBAction func touchDown(sender: AnyObject) {
        self.hideKeyboard()
        if (sender.tag == 3) {
            loginUser()
            //present()
            //lgUser(uidTextField.text, passwd: pwdTextField.text)
        }
    }
    
    override func viewDidLoad() {
        withKeyboard = true
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        beautifyUIView(loginView, cornerRadius: Constants.radius, backgroundColor: Constants.gray)
        beautifyUIView(loginButton, cornerRadius: Constants.radius, backgroundColor: Constants.green)
        view.backgroundColor = Constants.green
        
        checkUser()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    // do user log
    func loginUser() {
        changeUserInterFace()
        var uri = "http://mis.codewalle.com/cgi/account/login"
        var params: Dictionary<String, AnyObject> = ["uid": uidTextField.text, "pwd": pwdTextField.text]
        self.postHTTP(
            uri,
            params: params,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer != 0) {
                            self.error(resp["msg"].string!)
                        } else {
                            if (response.headers != nil) {
                                let sid = self.getSid(response.headers!)
                                let data = resp["data"]
                                STUser.shared.user = User(
                                    id: data["id"].integer!,
                                    uid: data["uid"].string!,
                                    name: data["name"].string!,
                                    auth: data["auth"].integer!
                                )
                                STUser.shared.sid = sid
                                //保存session至NSDefaults
                                let defaults = NSUserDefaults.standardUserDefaults()
                                defaults.setObject(sid, forKey: "sid")
                                self.present()
                            }
                        }
                        self.resume()
                    })
                } else {
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        self.error("数据解析错误!")
                        self.resume()
                    })
                }
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    self.error("系统繁忙!")
                    self.resume()
                })
            }
        )

    }
    
    func checkUser() {
        changeUserInterFace()
        
        let defaults = NSUserDefaults.standardUserDefaults()
        if let sid = defaults.stringForKey("sid") {
            STUser.shared.sid = sid
            var uri = "http://mis.codewalle.com/cgi/user/info"
            self.getHTTP(
                uri,
                success: {(response: HTTPResponse) -> Void in
                    if (response.responseObject != nil) {
                        let resp = JSONDecoder(response.responseObject!)
                        NSOperationQueue.mainQueue().addOperationWithBlock({
                            self.resume()
                            if (resp["code"].integer != 0) {
                                //self.error(resp["msg"].string!)
                            } else {
                                if (response.headers != nil) {
                                    let sid = self.getSid(response.headers!)
                                    let data = resp["data"]
                                    STUser.shared.user = User(
                                        id: data["id"].integer!,
                                        uid: data["uid"].string!,
                                        name: data["name"].string!,
                                        auth: data["auth"].integer!
                                    )
                                    //保存session至NSDefaults 是否需要每次更新？
                                    /*let defaults = NSUserDefaults.standardUserDefaults()
                                    defaults.setObject(sid, forKey: "sid")*/
                                    self.present()
                                }
                            }
                        })
                    } else {
                        NSOperationQueue.mainQueue().addOperationWithBlock({
                            self.error("数据解析错误!")
                            self.resume()
                        })
                    }
                },
                failure: {(error: NSError, response: HTTPResponse?) -> Void in
                    println(error)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        self.error("系统繁忙!")
                        self.resume()
                    })
                }
            )

        } else {
            resume()
        }
    }
    
    func error(msg: String) {
        errMsgLabel.text = msg
    }
    
    func changeUserInterFace() {
        activityIndicator.startAnimating()
        loginButton.hidden = true
    }
    
    func resume() {
        activityIndicator.stopAnimating()
        loginButton.hidden = false
    }
    
    func present() {
        //跳转界面
        var sb:UIStoryboard = UIStoryboard(name:"Main", bundle:nil) //Main对应storyboard的名字
        var vc:UINavigationController = sb.instantiateViewControllerWithIdentifier("mainEntry") as! UINavigationController  //关联viewController对应storyboard的xib。其中Identifier对应Main.storyboard中的xib的storyboardIdentify
        //self.navigationController?.pushViewController(vc,
        //    animated: true)   //这是导航的push切换方式
        //self.presentViewController(vc, animated: true, completion: nil)
        self.navigationController?.presentViewController(vc, animated: true, completion: nil)
    }
    
    func getSid(headers: Dictionary<String,String>) -> String {
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
