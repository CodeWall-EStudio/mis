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

class MainViewController: StickerViewController, UITableViewDelegate, UITableViewDataSource {
    
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
        
        checkPublic()
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
        iconButton.addTarget(self, action: "addButtonClick:", forControlEvents: UIControlEvents.TouchUpInside)
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
    func addButtonClick(sender:UIButton!) {
        println("timeButtonItem")
    }
    
    func checkPublic() {
        mainTabBar.selectedItem = mainTabBarItem1
        var uri = "http://mis.codewalle.com/cgi/subject/search?start=0&limit=50"
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
        let cell = tableView.dequeueReusableCellWithIdentifier("SubjectCell", forIndexPath: indexPath) as! UITableViewCell
        
        cell.textLabel?.text = subjects[indexPath.row].title
        //cell.TopicTitle.text = topicList[indexPath.row].title
        //let cell: UITableViewCell = UITableViewCell(style: UITableViewCellStyle.Subtitle, reuseIdentifier: "TopicCell")
        //cell.textLabel?.text = topicList[indexPath.row].title
        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    
    @IBAction func unwindToSubjects(segue:UIStoryboardSegue) {
        
    }

}

