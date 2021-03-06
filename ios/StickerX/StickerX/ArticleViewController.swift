//
//  ArticleViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class ArticleViewController: StickerViewController, UITableViewDelegate, UITableViewDataSource {
    
    var comments = [Comment]()
    var imageId:Int = 0
    
    @IBOutlet weak var articleCreator: UILabel!
    @IBOutlet weak var articleTitle: UILabel!
    @IBOutlet weak var articleContent: UITextView!
    @IBOutlet weak var mainTableView: UITableView!

    @IBOutlet weak var commentContent: UITextField!
    @IBOutlet weak var commentConfirm: UIButton!
    @IBOutlet weak var imageShow: UIImageView!
    
    @IBAction func editDidBegin(sender: AnyObject) {
        activeTextField = sender as? UITextField
        changeTextFieldStatus(true)
    }
    @IBAction func editDidEnd(sender: AnyObject) {
        activeTextField = sender as? UITextField
        changeTextFieldStatus(false)
        activeTextField = nil
    }
    @IBAction func reply(sender: AnyObject) {
        println("reply")
        self.hideKeyboard()
        postComment(commentContent.text)
    }
    /*@IBAction func didEndOnExit(sender: AnyObject) {
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
    }*/
    
    var refreshControl = UIRefreshControl()
    
    override func viewDidLoad() {
        withKeyboard = true
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        mainTableView.dataSource = self
        mainTableView.delegate = self
        mainTableView.tableFooterView = UIView(frame:CGRectZero)
        mainTableView.rowHeight = 88
        beautifyUIView(commentConfirm, cornerRadius: Constants.radius, backgroundColor: Constants.green)
        let articleId = STUser.shared.selectedArticleId!
        getArticle("http://\(STUser.shared.server!)/cgi/article/info?id=\(articleId)")
        getComments("http://\(STUser.shared.server!)/cgi/comment/search?start=0&limit=100&articleId=\(articleId)")
        
        refreshControl.addTarget(self, action: "refreshData", forControlEvents: UIControlEvents.ValueChanged)
        refreshControl.attributedTitle = NSAttributedString(string: "松手刷新")
        mainTableView.addSubview(refreshControl)
        
    }
    
    func refreshData() {
        getComments("http://\(STUser.shared.server!)/cgi/comment/search?start=0&limit=100&articleId=\(STUser.shared.selectedArticleId!)")
        refreshControl.endRefreshing()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func getArticle(uri: String) {
        self.getHTTP(
            uri,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            let data = Article(resp["data"])
                            if let id = resp["data"]["resourceList"][0]["id"].integer {
                                var request = HTTPTask()
                                if let sid = STUser.shared.sid {
                                    request.requestSerializer = HTTPRequestSerializer()
                                    request.requestSerializer.headers["Cookie"] = "sid=\"\(sid)\""
                                }
                                let downloadTask = request.download("http://\(STUser.shared.server!)/cgi/resource/download?id=\(id)", parameters: nil, progress: {(complete: Double) in
                                    println("percent complete: \(complete)")
                                    }, success: {(response: HTTPResponse) in
                                        if let url = response.responseObject as? NSURL {
                                            var data:NSData = NSData(contentsOfURL: url)!
                                            //println(data.length)
                                            NSOperationQueue.mainQueue().addOperationWithBlock({
                                                self.imageShow.image = UIImage(data: data)
                                            })
                                        }
                                        /*if let url = response.responseObject as? NSURL {
                                            if let path = NSSearchPathForDirectoriesInDomains(.DocumentDirectory, .UserDomainMask, true).first as? String {
                                                if let fileName = response.suggestedFilename {
                                                    if let newPath = NSURL(fileURLWithPath: "\(path)/\(fileName)") {
                                                        let fileManager = NSFileManager.defaultManager()
                                                        fileManager.removeItemAtURL(newPath, error: nil)
                                                        fileManager.moveItemAtURL(url, toURL: newPath, error:nil)
                                                        println(newPath)
                                                    }
                                                }
                                            }
                                        }*/
                                                                               //self.imageShow.image = UIImage(contentsOfFile: response.text()!)
                                        /*if response.responseObject != nil {
                                            //we MUST copy the file from its temp location to a permanent location.
                                            if let url = response.responseObject as? NSURL {
                                                if let path = NSSearchPathForDirectoriesInDomains(.DocumentDirectory, .UserDomainMask, true).first as? String {
                                                    if let fileName = response.suggestedFilename {
                                                        if let newPath = NSURL(fileURLWithPath: "\(path)/\(fileName)") {
                                                            let fileManager = NSFileManager.defaultManager()
                                                            fileManager.removeItemAtURL(newPath, error: nil)
                                                            fileManager.moveItemAtURL(url, toURL: newPath, error:nil)
                                                        }
                                                    }
                                                }
                                            }
                                        }*/
                                        
                                    } ,failure: {(error: NSError, response: HTTPResponse?) in
                                        println("failure")
                                })
                            }
                            self.articleCreator.text = data.creatorName
                            self.articleTitle.text = data.title
                            self.articleContent.text = data.content
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
    
    func getComments(uri: String) {
        self.comments = []
        self.mainTableView.reloadData()
        self.getHTTP(
            uri,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            self.comments = Comments(resp["data"]).comments!
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
        return comments.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("CommentCell", forIndexPath: indexPath) as! CommentTableViewCell
        
        /*cell.articleCreator.text = articles[indexPath.row].creatorName
        cell.articleTitle.text = articles[indexPath.row].title
        cell.articleContent.text = articles[indexPath.row].content
        cell.tag = articles[indexPath.row].id!*/
        cell.commenter?.text = comments[indexPath.row].creatorName
        cell.comment?.text = comments[indexPath.row].content
        return cell
    }
    
    
    func postComment(content: String) {
        let subjectId = STUser.shared.selectedSubjectId!
        var uri = "http://\(STUser.shared.server!)/cgi/comment/create"
        let articleIdx = STUser.shared.selectedArticleId!
        let subjectIdx = STUser.shared.selectedSubjectId!
        var params: Dictionary<String, AnyObject> = [
            "subjectId": subjectIdx,
            "articleId": articleIdx,
            "content": content,
            //"labels": "[]",
            //"resources": "[]",
            "title": ""
        ]
        postHTTP(uri, params: params,
            success: {(response: HTTPResponse) -> Void in
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    let resp = JSONDecoder(response.responseObject!)
                    if (resp["code"].integer != 0) {
                        println(resp["msg"].string)
                    } else {
                        println("success")
                        self.getComments("http://\(STUser.shared.server!)/cgi/comment/search?start=0&limit=100&articleId=\(articleIdx)")
                    }
                })
            }, failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
            }
        )
    }


    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
