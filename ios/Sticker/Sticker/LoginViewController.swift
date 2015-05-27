//
//  LoginViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class LoginViewController: UIViewController {
    
    @IBOutlet weak var loginView: LoginView!
    override func viewDidLoad() {
        //super.viewDidLoad()

        // Do any additional setup after loading the view.
        prepare()
        
    }

    override func didReceiveMemoryWarning() {
        //super.didReceiveMemoryWarning()
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
    
    func prepare() {
        // draw loginView
        loginView.backgroundColor = Theme.shared.loginBackgroundColor
        
        // bind action
        loginView.loginFormConfirmButton.addTarget(self, action: "confirm", forControlEvents: UIControlEvents.TouchUpInside)
        loginView.loginConfigButton.addTarget(self, action: "config", forControlEvents: UIControlEvents.TouchUpInside)
        
        // check server domian
        server()
        
        // check user status
        check()
    }
    
    func server() {
        let defaults = NSUserDefaults.standardUserDefaults()
        if let server = defaults.stringForKey("server") {
            Config.shared.server = server
        } else {
            Config.shared.server = Config.shared.servers[0].domain
        }
    }
    
    func check() {
        let defaults = NSUserDefaults.standardUserDefaults()
        if let sid = defaults.stringForKey("sid") {
            HTTP.shared.sid = sid
            loginView.loginStart()
            HTTP.get(
                "http://\(Config.shared.server)/cgi/user/info",
                success: {(response: HTTPResponse) -> Void in
                    if (response.responseObject != nil) {
                        let resp = JSONDecoder(response.responseObject!)
                        NSOperationQueue.mainQueue().addOperationWithBlock({
                            self.loginView.loginEnd()
                            if (resp["code"].integer != 0) {
                                //self.error(resp["msg"].string!)
                            } else {
                                if (response.headers != nil) {
                                    let sid = HTTP.format(response.headers!)
                                    let data = resp["data"]
                                    Config.shared.user = User(
                                        id: data["id"].integer!,
                                        uid: data["uid"].string!,
                                        name: data["name"].string!,
                                        auth: data["auth"].integer!
                                    )
                                    //保存session至NSDefaults 是否需要每次更新？
                                    /*let defaults = NSUserDefaults.standardUserDefaults()
                                    defaults.setObject(sid, forKey: "sid")*/
                                    self.success()
                                }
                            }
                        })
                    } else {
                        NSOperationQueue.mainQueue().addOperationWithBlock({
                            self.error("数据解析错误!")
                            self.loginView.loginEnd()
                        })
                    }
                },
                failure: {(error: NSError, response: HTTPResponse?) -> Void in
                    println(error)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        self.error("系统繁忙!")
                        self.loginView.loginEnd()
                    })
                }
            )
        }
    }
    
    func confirm() {
        HTTP.post(
            "http://\(Config.shared.server)/cgi/account/login",
            params: ["uid": loginView.loginUidTextField.text, "pwd": loginView.loginPasswdTextField.text],
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        self.loginView.loginEnd()
                        if (resp["code"].integer != 0) {
                            self.error(resp["msg"].string!)
                        } else {
                            if (response.headers != nil) {
                                let sid = HTTP.format(response.headers!)
                                let data = resp["data"]
                                Config.shared.user = User(
                                    id: data["id"].integer!,
                                    uid: data["uid"].string!,
                                    name: data["name"].string!,
                                    auth: data["auth"].integer!
                                )
                                HTTP.shared.sid = sid
                                //保存session至NSDefaults
                                let defaults = NSUserDefaults.standardUserDefaults()
                                defaults.setObject(sid, forKey: "sid")
                                self.success()
                            }
                        }
                    })
                } else {
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        self.error("数据解析错误!")
                        self.loginView.loginEnd()
                    })
                }
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    self.error("系统繁忙!")
                    self.loginView.loginEnd()
                })
            }
        )
    }
    
    func config() {
        performSegueWithIdentifier("presentServerSwitch", sender: self)
    }
    
    func success() {
        var sb:UIStoryboard = UIStoryboard(name:"Main", bundle:nil) //Main对应storyboard的名字
        var vc:UINavigationController = sb.instantiateViewControllerWithIdentifier("MainEntryNav") as! UINavigationController  //关联viewController对应storyboard的xib。其中Identifier对应Main.storyboard中的xib的storyboardIdentify
        //self.navigationController?.pushViewController(vc,
        //    animated: true)   //这是导航的push切换方式
        //self.presentViewController(vc, animated: true, completion: nil)
        self.navigationController?.presentViewController(vc, animated: true, completion: nil)
    }
    
    func error(err: String) {
        
    }

    @IBAction func unwindToLogin(segue:UIStoryboardSegue) {
    }
}
