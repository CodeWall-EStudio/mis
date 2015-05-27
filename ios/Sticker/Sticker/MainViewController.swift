//
//  MainViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class MainViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UITabBarDelegate {
    
    var subjects = [Subject]()
    var tag:Int = 0
    var refreshControl = UIRefreshControl()
    var actions = [
        "http://\(Config.shared.server)/cgi/subject/search?start=0&limit=100&private=1",
        "http://\(Config.shared.server)/cgi/subject/invited?start=0&limit=100",
        "http://\(Config.shared.server)/cgi/subject/list?start=0&limit=100",
        "http://\(Config.shared.server)/cgi/subject/following?start=0&limit=100",
        "http://\(Config.shared.server)/cgi/subject/archived?start=0&limit=100"
    ]

    @IBOutlet weak var subjectTableView: UITableView!
    @IBOutlet weak var subjectTabBar: UITabBar!
    @IBOutlet weak var subjectTabBarItem: UITabBarItem!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        prepareForNavigation()
        prepareForTableView()
        prepareForTabBar()
        
        getSubjects(actions[tag])
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func logout(sender: AnyObject) {
        HTTP.shared.sid = ""
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.removeObjectForKey("sid")
        HTTP.get(
            "http://\(Config.shared.server)/cgi/account/logout",
            success: {(response: HTTPResponse) -> Void in
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                /*NSOperationQueue.mainQueue().addOperationWithBlock({
                })*/
            }
        )
        var sb:UIStoryboard = UIStoryboard(name:"Login", bundle:nil) //Main对应storyboard的名字
        var vc:UINavigationController = sb.instantiateViewControllerWithIdentifier("LoginEntryNav") as! UINavigationController  //关联viewController对应storyboard的xib。其中Identifier对应Main.storyboard中的xib的storyboardIdentify
        //self.navigationController?.pushViewController(vc,
        //    animated: true)   //这是导航的push切换方式
        //self.presentViewController(vc, animated: true, completion: nil)
        self.navigationController?.presentViewController(vc, animated: true, completion: nil)
    }
    
    func create(sender: AnyObject) {
        performSegueWithIdentifier("presentSubjectCreate", sender: self)
    }
    
    func prepareForNavigation() {
        let homeButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        homeButton.frame = CGRectMake(0, 0, 22, 22)
        homeButton.setImage(UIImage(named:"Icon"), forState: UIControlState.Normal)
        homeButton.addTarget(self, action: "logout:", forControlEvents: UIControlEvents.TouchUpInside)
        var homeButtonItem: UIBarButtonItem = UIBarButtonItem(customView: homeButton)
        navigationItem.setLeftBarButtonItem(homeButtonItem, animated: true)
        
        let addButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        addButton.frame = CGRectMake(0, 0, 18, 18)
        addButton.setImage(UIImage(named:"Add"), forState: UIControlState.Normal)
        addButton.addTarget(self, action: "create:", forControlEvents: UIControlEvents.TouchUpInside)
        var addButtonItem: UIBarButtonItem = UIBarButtonItem(customView: addButton)
        navigationItem.setRightBarButtonItem(addButtonItem, animated: true)
    }
    
    func prepareForTableView() {
        subjectTableView.dataSource = self
        subjectTableView.delegate = self
        subjectTableView.tableFooterView = UIView(frame:CGRectZero)
        subjectTableView.tableHeaderView = UIView(frame:CGRectZero)
        subjectTableView.rowHeight = 100
        subjectTableView.separatorStyle = UITableViewCellSeparatorStyle.None
        
        subjectTableView.backgroundColor = Theme.shared.tableBackgroundColor
        self.view.backgroundColor = Theme.shared.tableBackgroundColor
        
        refreshControl.addTarget(self, action: "refresh", forControlEvents: UIControlEvents.ValueChanged)
        refreshControl.attributedTitle = NSAttributedString(string: "松手刷新")
        subjectTableView.addSubview(refreshControl)
    }
    
    func prepareForTabBar() {
        subjectTabBar.delegate = self
        subjectTabBar.selectedItem = subjectTabBarItem
        subjectTabBar.backgroundColor = Theme.shared.tabbarBackgroundColor
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
        
        cell.subjectBackgroundView.layer.cornerRadius = Theme.shared.cellCornerRadius
        cell.subjectBackgroundView.layer.borderWidth = 1
        cell.subjectBackgroundView.layer.borderColor = Theme.shared.cellBorderColor.CGColor
        cell.backgroundColor = Theme.shared.tableBackgroundColor
        
        let r = arc4random_uniform(5) + 1
        cell.subjectImageView.image = UIImage(named: "Subject0\(r)")
        cell.subjectTitleLabel.text = "\(subjects[indexPath.row].title!)"
        cell.articleCountLabel.text = " \(subjects[indexPath.row].articleCount!)"
        cell.memberCountLabel.text = " \(subjects[indexPath.row].memberCount!)"
        cell.resourceCountLabel.text = " \(subjects[indexPath.row].resourceCount!)"
        cell.creatorNameLabel.text = "\(subjects[indexPath.row].creatorName!)"
        let ct: String = subjects[indexPath.row].createTime!
        cell.creatTimeLable.text = (ct as NSString).substringToIndex(10)
        let ut: String = subjects[indexPath.row].updateTime!
        cell.updateTimeLabel.text = (ut as NSString).substringToIndex(10)
        cell.tag = subjects[indexPath.row].id!
        
        return cell
    }
    
    func tabBar(tabBar: UITabBar, didSelectItem item: UITabBarItem!) {
        var uri: String
        tag = item.tag - 1
        getSubjects(actions[tag])
    }
    
    func refresh() {
        getSubjects(actions[tag])
        refreshControl.endRefreshing()
    }
    
    func getSubjects(url: String) {
        subjects = []
        subjectTableView.reloadData()
        HTTP.get(
            url,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            self.subjects = Subjects(resp["data"]).subjects!
                            self.subjectTableView.reloadData()
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



    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if (segue.identifier == "presentSubjectView") {
            Config.shared.subjectId = sender!.tag
        }
    }
    
    @IBAction func unwindToMain(segue:UIStoryboardSegue) {
    }
}
