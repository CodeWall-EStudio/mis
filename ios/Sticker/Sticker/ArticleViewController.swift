//
//  ArticleViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/21/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class ArticleViewController: UIViewController, UITableViewDelegate, UITableViewDataSource  {

    var article = Article()
    var comments = [Comment]()
    var refreshControl = UIRefreshControl()
    var resourceId = 0
    var data:NSData = NSData()
    
    @IBOutlet weak var articleTitleLabel: UILabel!
    @IBOutlet weak var articleContentLabel: UILabel!
    @IBOutlet weak var createTimeLabel: UILabel!
    @IBOutlet weak var creatorNameLabel: UILabel!
    @IBOutlet weak var articleBackgroundView: UIView!
    @IBOutlet weak var articleBackgroundViewHeight: NSLayoutConstraint!
    @IBOutlet weak var articleContentHeight: NSLayoutConstraint!
    @IBOutlet weak var commentTableView: UITableView!
    @IBOutlet weak var commentInputHeight: NSLayoutConstraint!
    @IBOutlet weak var commentInputTextField: UITextField!
    
    @IBOutlet weak var resourceImageView: UIButton!
    @IBAction func handleTableViewPan(sender: UIPanGestureRecognizer) {
        commentInputTextField.resignFirstResponder()
    }
    @IBAction func postComments(sender: UIButton) {
        let comment = commentInputTextField.text
        if (comment != "") {
            reply(comment)
        }
    }
    @IBAction func scalePicture(sender: AnyObject) {
        var vc:PictureViewController = self.storyboard?.instantiateViewControllerWithIdentifier("PictrueViewEntry") as! PictureViewController
        
        println("present")
        
        vc.view.backgroundColor = UIColor.clearColor()
        if (self.resourceId != 0) {
            vc.picImageView.image = UIImage(data: self.data)
        }
        self.modalPresentationStyle = UIModalPresentationStyle.CurrentContext
        self.presentViewController(vc, animated: true, completion: nil)
        println("present")

    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        prepareForTableView()
        getArticle("http://\(Config.shared.server)/cgi/article/info?id=\(Config.shared.articleId)")
        getComments("http://\(Config.shared.server)/cgi/comment/search?start=0&limit=100&articleId=\(Config.shared.articleId)")
        
        registerKeyboardNotifications()
        
        resourceImageView.hidden = true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func prepareForTableView() {
        commentTableView.dataSource = self
        commentTableView.delegate = self
        commentTableView.tableFooterView = UIView(frame:CGRectZero)
        commentTableView.tableHeaderView = UIView(frame:CGRectZero)
        commentTableView.rowHeight = 70
        //commentTableView.separatorStyle = UITableViewCellSeparatorStyle.None
        
        refreshControl.addTarget(self, action: "refresh", forControlEvents: UIControlEvents.ValueChanged)
        refreshControl.attributedTitle = NSAttributedString(string: "松手刷新")
        commentTableView.addSubview(refreshControl)
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
        
        println(comments[indexPath.row].content)
        cell.commentContentLabel.text = "\(comments[indexPath.row].content!)"
        cell.creatorNameLabel.text = "\(comments[indexPath.row].creatorName!)"
        let ct: String = comments[indexPath.row].createTime!
        cell.creatTimeLabel.text = (ct as NSString).substringToIndex(10)
        cell.tag = comments[indexPath.row].id!
        
        /*let r = arc4random_uniform(5) + 1
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
        cell.tag = subjects[indexPath.row].id!*/
        
        return cell
    }
    
    func getArticle(url: String) {
        HTTP.get(
            url,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            self.article = Article(resp["data"])
                            self.creatorNameLabel.text = "\(self.article.creator!)"
                            self.articleTitleLabel.text = self.article.title!
                            self.articleContentLabel.text = self.article.content!
                            //self.articleContentLabel.text = "本店于十一期间特推出一系列优惠，限时限量敬请选购！沙发：钻石品质，首领风范！床垫：华贵典雅，彰显时尚！尊贵而不失奢华，典雅却不失自然！温馨和浪漫的生活，我们与你一同创造！"
                            self.articleContentLabel.sizeToFit()
                            let h = self.articleContentLabel.frame.size.height
                            
                            self.articleBackgroundViewHeight.constant += h - 21
                            
                            self.articleContentHeight.constant = h
                            
                            //self.articleBackgroundView.frame.size.height += self.articleContentLabel.frame.size.height - 21
                            
                            let ct: String = self.article.createTime!
                            self.createTimeLabel.text = (ct as NSString).substringToIndex(10)
                            
                            if let id = resp["data"]["resourceList"][0]["id"].integer {
                                self.resourceImageView.hidden = false
                                //self.articleBackgroundViewHeight.constant += 100
                                if (id == self.resourceId) {
                                    self.resourceImageView.setImage(UIImage(data: self.data), forState: UIControlState.Normal)
                                } else {
                                    var request = HTTPTask()
                                    request.requestSerializer = HTTPRequestSerializer()
                                    request.requestSerializer.headers["Cookie"] = "sid=\"\(HTTP.shared.sid)\""
                                    let downloadTask = request.download("http://\(Config.shared.server)/cgi/resource/download?id=\(id)", parameters: nil, progress: {(complete: Double) in
                                        println("percent complete: \(complete)")
                                        }, success: {(response: HTTPResponse) in
                                            if let url = response.responseObject as? NSURL {
                                                var data:NSData = NSData(contentsOfURL: url)!
                                                //println(data.length)
                                                NSOperationQueue.mainQueue().addOperationWithBlock({
                                                    self.data = data
                                                    self.resourceId = id
                                                    self.resourceImageView.setImage(UIImage(data: self.data), forState: UIControlState.Normal)
                                                })
                                            }
                                        } ,failure: {(error: NSError, response: HTTPResponse?) in
                                            println("failure")
                                    })
                                }
                            }

                            // test
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
    
    func getComments(url: String) {
        comments = []
        commentTableView.reloadData()
        HTTP.get(
            url,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            if (resp["code"].integer == 0) {
                                self.comments = Comments(resp["data"]).comments!
                                self.commentTableView.reloadData()
                            }
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

    
    func refresh() {
        getComments("http://\(Config.shared.server)/cgi/comment/search?start=0&limit=100&articleId=\(Config.shared.articleId)")
        refreshControl.endRefreshing()
    }
    
    
    func reply(content: String) {
        var url = "http://\(Config.shared.server)/cgi/comment/create"
        var params: Dictionary<String, AnyObject> = [
            "subjectId": Config.shared.subjectId,
            "articleId": Config.shared.articleId,
            "content": content,
            "title": ""
        ]
        commentInputTextField.resignFirstResponder()
        commentInputTextField.text = ""
        HTTP.post(url, params: params,
            success: {(response: HTTPResponse) -> Void in
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    let resp = JSONDecoder(response.responseObject!)
                    if (resp["code"].integer != 0) {
                        println(resp["msg"].string)
                    } else {
                        println("success")
                        self.refresh()
                    }
                })
            }, failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
            }
        )
    }
    
    
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
        if let keyboardHeight = info[UIKeyboardFrameEndUserInfoKey]?.CGRectValue().size.height {
            commentInputHeight.constant = keyboardHeight
            UIView.animateWithDuration(0.25, animations: { () -> Void in
                self.view.layoutIfNeeded()
            })
        }
    }
    
    // Called when the UIKeyboardWillHideNotification is sent
    func keyboardWillBeHidden(sender: NSNotification) {
        commentInputHeight.constant = 0
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
