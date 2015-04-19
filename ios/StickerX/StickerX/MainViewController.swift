//
//  ViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/9/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class MainViewController: StickerViewController, UITableViewDelegate, UITableViewDataSource, UITabBarDelegate {
    
    var subjects = [Subject]()
    
    @IBOutlet weak var mainNavigationItem: UINavigationItem!
    
    @IBOutlet weak var mainTabBar: UITabBar!
    @IBOutlet weak var mainTabBarItem1: UITabBarItem!
    @IBOutlet weak var mainTabBarItem2: UITabBarItem!
    @IBOutlet weak var mainTabBarItem3: UITabBarItem!
    @IBOutlet weak var mainTabBarItem4: UITabBarItem!
    @IBOutlet weak var mainTabBarItem5: UITabBarItem!
    
    @IBOutlet weak var mainTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        addLeftNavItemOnView()
        //addRightNavItemOnView()
        
        mainTableView.dataSource = self
        mainTableView.delegate = self
        mainTableView.tableFooterView = UIView(frame:CGRectZero)
        mainTableView.rowHeight = 98
        mainTabBar.selectedItem = mainTabBarItem1
        mainTabBar.delegate = self
        getSubjects("http://mis.codewalle.com/cgi/subject/search?start=0&limit=100&private=1")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // 左侧导航
    func addLeftNavItemOnView() {
        let iconButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        iconButton.frame = CGRectMake(0, 0, 24, 24)
        iconButton.setImage(UIImage(named:"icon"), forState: UIControlState.Normal)
        iconButton.addTarget(self, action: "logout:", forControlEvents: UIControlEvents.TouchUpInside)
        var iconButtonItem: UIBarButtonItem = UIBarButtonItem(customView: iconButton)
        let titleLabel:UILabel = UILabel(frame:CGRectMake(0, 0, 120, 24))
        titleLabel.text = "思课Sticker"
        titleLabel.textColor = UIColor(red: 1, green: 1, blue: 1, alpha: 1)
        var xButtonItem: UIBarButtonItem = UIBarButtonItem(customView: titleLabel)
        mainNavigationItem.setLeftBarButtonItems([iconButtonItem, xButtonItem], animated: true)
    }
    
    // 右侧导航
    func addRightNavItemOnView() {
        let addButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        addButton.frame = CGRectMake(0, 0, 24, 24)
        addButton.setImage(UIImage(named:"add"), forState: UIControlState.Normal)
        addButton.addTarget(self, action: "addButtonClick:", forControlEvents: UIControlEvents.TouchUpInside)
        var addButtonItem: UIBarButtonItem = UIBarButtonItem(customView: addButton)
        mainNavigationItem.setRightBarButtonItem(addButtonItem, animated: true)
    }

    
    // 行为
    func iconButtonClick(sender:UIButton!) {
    }
    
    func logout(sender:UIButton!) {
        var uri = "http://mis.codewalle.com/cgi/account/logout"
        STUser.shared.user = nil
        STUser.shared.sid = nil
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.removeObjectForKey("sid")
        self.getHTTP(
            uri,
            success: {(response: HTTPResponse) -> Void in
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                /*NSOperationQueue.mainQueue().addOperationWithBlock({
                })*/
            }
        )
        self.presentLogin()
    }
    
    func getSubjects(uri: String) {
        self.subjects = []
        self.mainTableView.reloadData()
        self.getHTTP(
            uri,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            self.subjects = Subjects(resp["data"]).subjects!
                            self.mainTableView.reloadData()
                        }
                    })
                } else {
                    /*NSOperationQueue.mainQueue().addOperationWithBlock({
                    })*/
                }
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                /*NSOperationQueue.mainQueue().addOperationWithBlock({
                })*/
            }
        )
    }
    
    // table
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return subjects.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("SubjectCell", forIndexPath: indexPath) as! SubjectTableViewCell
        
        cell.title.text = subjects[indexPath.row].title
        cell.creator.text = "\(subjects[indexPath.row].creatorName!)"
        let ct: String = subjects[indexPath.row].createTime!
        cell.creatTime.text = (ct as NSString).substringToIndex(10)
        cell.updator.text = "\(subjects[indexPath.row].updator!)"
        cell.memberCount.text = "\(subjects[indexPath.row].memberCount!)"
        cell.resourceCount.text = "\(subjects[indexPath.row].resourceCount!)"
        cell.tag = subjects[indexPath.row].id!
        
        
        
        
        //cell.TopicTitle.text = topicList[indexPath.row].title
        //let cell: UITableViewCell = UITableViewCell(style: UITableViewCellStyle.Subtitle, reuseIdentifier: "TopicCell")
        //cell.textLabel?.text = topicList[indexPath.row].title
        return cell
    }
    
    func tabBar(tabBar: UITabBar, didSelectItem item: UITabBarItem!) {
        var uri: String
        switch (item.tag) {
        case 2:
            uri = "http://mis.codewalle.com/cgi/subject/invited?start=0&limit=100"
        case 3:
            let user = STUser.shared.user! as User
            let id: Int = user.id as Int
            uri = "http://mis.codewalle.com/cgi/subject/search?start=0&limit=100&creator=\(id)"
        case 4:
            uri = "http://mis.codewalle.com/cgi/subject/following?start=0&limit=100"
        case 5:
            uri = "http://mis.codewalle.com/cgi/subject/archived?start=0&limit=100"
        default:
            uri = "http://mis.codewalle.com/cgi/subject/search?start=0&limit=100&private=1"
        }
        getSubjects(uri)
    }
    
    func presentLogin() {
        //跳转界面
        var sb:UIStoryboard = UIStoryboard(name:"Login", bundle:nil) //Main对应storyboard的名字
        var vc:UINavigationController = sb.instantiateViewControllerWithIdentifier("loginEntry") as! UINavigationController  //关联viewController对应storyboard的xib。其中Identifier对应Main.storyboard中的xib的storyboardIdentify
        //self.navigationController?.pushViewController(vc,
        //    animated: true)   //这是导航的push切换方式
        //self.presentViewController(vc, animated: true, completion: nil)
        self.navigationController?.presentViewController(vc, animated: true, completion: nil)
    }

    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        if (segue.identifier == "subjectSegue") {
            STUser.shared.selectedSubjectId = sender!.tag
        }
    }
    
    @IBAction func unwindToSubjects(segue:UIStoryboardSegue, sender: AnyObject?) {
        if (segue.sourceViewController.isKindOfClass(SubjectPostViewController)) {
            if let tag = sender?.tag {
                if (tag == 2) {
                    var svc = segue.sourceViewController as! SubjectPostViewController
                    let title = svc.subjectTitle.text
                    let mark = svc.subjectMark.text
                    postSubject(title, mark: mark)
                }
            }
        }
        println(sender?.tag)
    }
    
    func postSubject(title: String, mark: String) {
        var uri = "http://mis.codewalle.com/cgi/subject/create"
        var params: Dictionary<String, AnyObject> = [
            "title": title,
            "mark": mark,
            "private": 1,
            "guest": 1
            //"labels": "[]",
            //"resources": "[]",
        ]
        postHTTP(uri, params: params,
            success: {(response: HTTPResponse) -> Void in
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    let resp = JSONDecoder(response.responseObject!)
                    if (resp["code"].integer != 0) {
                        println(resp["msg"].string)
                    } else {
                        println("success")
                        self.mainTabBar.selectedItem = self.mainTabBarItem1
                        self.getSubjects("http://mis.codewalle.com/cgi/subject/search?start=0&limit=100&private=1")
                    }
                })
            }, failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
            }
        )
    }


}

